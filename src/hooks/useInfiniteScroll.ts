// src/hooks/useInfiniteScroll.ts
import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  loading: boolean,
  hasMore: boolean,
  callback: () => void,
  options?: IntersectionObserverInit
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't observe while loading
    if (loading) return;
    
    // Always disconnect the previous observer before creating a new one
    if (observer.current) {
      observer.current.disconnect();
    }
    
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        callback();
      }
    };
    
    // Create the observer with default or custom options
    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
      ...options
    };
    
    observer.current = new IntersectionObserver(handleObserver, defaultOptions);
    
    // Start observing the loading element if it exists
    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }
    
    // Cleanup function to disconnect the observer when component unmounts or dependencies change
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, callback, options]);

  return loadingRef;
};