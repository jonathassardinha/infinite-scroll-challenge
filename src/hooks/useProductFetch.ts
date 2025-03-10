// src/hooks/useProductFetch.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { ProductType } from '../components';

export const useProductFetch = (initialLimit = 10, maxRetries = 3) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Store the abort controller to cancel ongoing requests
  const abortControllerRef = useRef<AbortController | null>(null);
  
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
    if (loading || (!hasMore && page > 0) || (error && retryCount >= maxRetries)) return;
    
    // Cancel any previous ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${page * LIMIT}`,
        { signal }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.products || data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage((prevPage) => prevPage + 1);
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
  }, [page, loading, hasMore, LIMIT, error, retryCount, maxRetries]);

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