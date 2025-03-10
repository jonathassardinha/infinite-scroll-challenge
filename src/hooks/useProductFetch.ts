// src/hooks/useProductFetch.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { ProductType } from '@components/index';

export const useProductFetch = (initialLimit = 10, maxRetries = 3) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Store the abort controller to cancel ongoing requests
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Keep track of the current page to avoid race conditions
  const currentPageRef = useRef(page);
  useEffect(() => {
    currentPageRef.current = page;
  }, [page]);
  
  const LIMIT = initialLimit;

  // Cleanup function to cancel any pending request when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const fetchProducts = useCallback(async () => {
    // Don't fetch if already loading, no more data, or reached max retries
    if (loading || (!hasMore && currentPageRef.current > 0) || (error && retryCount >= maxRetries)) {
      console.log("Fetch prevented:", { loading, hasMore, page: currentPageRef.current, error, retryCount, maxRetries });
      return;
    }
    
    // Cancel any previous ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    setLoading(true);
    setError(null);
    
    // Use currentPageRef.current to get the latest page value
    const currentPage = currentPageRef.current;
    console.log(`Fetching products: page=${currentPage}, skip=${currentPage * LIMIT}, limit=${LIMIT}`);
    
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${currentPage * LIMIT}`,
        { signal }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Received data:`, { 
        total: data.total, 
        count: data.products?.length,
        hasMore: data.total > (currentPage + 1) * LIMIT 
      });
      
      if (!data.products || data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(data.total > (currentPage + 1) * LIMIT);
        setRetryCount(0); // Reset retry count on success
      }
    } catch (err) {
      // Only set error if it's not an abort error
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
        setRetryCount((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, error, retryCount, maxRetries, LIMIT]);

  // Function to retry the last failed request
  const retryFetch = useCallback(() => {
    if (error) {
      setError(null);
      fetchProducts();
    }
  }, [error, fetchProducts]);

  // Function to reset everything
  const resetProducts = useCallback(() => {
    setProducts([]);
    setPage(0);
    currentPageRef.current = 0;
    setHasMore(true);
    setError(null);
    setRetryCount(0);
    setLoading(false);
  }, []);

  return {
    products,
    loading,
    hasMore,
    error,
    fetchProducts,
    retryFetch,
    resetProducts
  };
};