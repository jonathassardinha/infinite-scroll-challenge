// src/App.tsx
import { useEffect, useState, useCallback } from "react";
import "./App.css";
import { 
  Header, 
  LoadingIndicator, 
  ProductGrid, 
  SeeMoreButton
} from "./components";
import { useProductFetch, useInfiniteScroll } from "./hooks";

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const { products, loading, hasMore, fetchProducts, error } = useProductFetch(10);
  
  // Configure the infinite scroll hook with the fetchProducts callback
  const loadingRef = useInfiniteScroll(
    loading, 
    hasMore, 
    useCallback(() => {
      console.log("Infinite scroll triggered - fetching more products");
      fetchProducts();
    }, [fetchProducts]),
    { rootMargin: '200px' },  // Increased margin to load earlier
    100 // Low debounce time for better responsiveness
  );

  // Initial load
  useEffect(() => {
    const loadInitialData = async () => {
      await fetchProducts();
      setInitialLoading(false);
    };
    
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount, fetchProducts dependency is handled inside the hook

  const handleSeeMore = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Error message component
  const ErrorMessage = () => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {error || "Failed to load products. Please try again later."}</span>
    </div>
  );

  return (
    <>
      <main className="grow min-h-screen px-8 md:px-20 py-12 bg-gray-100">
        <section>
          <Header />
          
          {/* Error state */}
          {error && <ErrorMessage />}
          
          {/* Initial loading state - show skeleton loaders */}
          {initialLoading && <LoadingIndicator type="skeletons" count={6} />}
          
          {/* Content loaded state */}
          {!initialLoading && (
            <>
              {/* Pass the loadingRef to the ProductGrid for infinite scrolling */}
              <ProductGrid products={products} loadingRef={loadingRef} />
              
              {/* Show loading spinner only when loading more products */}
              {loading && <LoadingIndicator type="spinner" />}
              
              {/* Show "See more" button when there are more products and not currently loading */}
              {hasMore && !loading && <SeeMoreButton onClick={handleSeeMore} />}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default App;