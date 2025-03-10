// src/hooks/useInfiniteScroll.ts
import { useEffect, useRef, useCallback } from 'react';

// Utility function to debounce function calls
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const useInfiniteScroll = (
  loading: boolean,
  hasMore: boolean,
  callback: () => void,
  options?: IntersectionObserverInit,
  debounceTime: number = 200 // Default debounce time in ms
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  
  // Create a stable version of the callback that doesn't change on every render
  const stableCallback = useCallback(callback, [callback]);
  
  // Debounce the callback to avoid too many API calls during fast scrolling
  const debouncedCallback = useRef(
    debounce(() => {
      stableCallback();
    }, debounceTime)
  );

  useEffect(() => {
    // Don't observe while loading
    if (loading) return;
    
    // Always disconnect the previous observer before creating a new one
    if (observer.current) {
      observer.current.disconnect();
    }
    
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        debouncedCallback.current();
      }
    };
    
    // Create the observer with default or custom options
    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '100px', // Load earlier for better UX
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
  }, [loading, hasMore, stableCallback, options, debounceTime]);

  return loadingRef;
};