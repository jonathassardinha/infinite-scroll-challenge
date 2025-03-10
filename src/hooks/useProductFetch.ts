// src/hooks/useProductFetch.ts
import { useState, useCallback } from 'react';
import { ProductType } from '../components';

export const useProductFetch = (initialLimit = 10) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  
  const LIMIT = initialLimit;

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${page * LIMIT}`
      );
      const data = await response.json();
      
      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, LIMIT]);

  return {
    products,
    loading,
    hasMore,
    fetchProducts
  };
};