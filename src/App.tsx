// src/App.tsx
import { useEffect } from "react";
import "./App.css";
import { 
  Header, 
  LoadingIndicator, 
  ProductGrid, 
  SeeMoreButton
} from "./components";
import { useProductFetch, useInfiniteScroll } from "./hooks";

function App() {
  const { products, loading, hasMore, fetchProducts } = useProductFetch(10);
  
  // Configure the infinite scroll hook with the fetchProducts callback
  const loadingRef = useInfiniteScroll(
    loading, 
    hasMore, 
    fetchProducts,
    { rootMargin: '100px' }  // Load earlier, before fully scrolling to the end
  );

  // Initial load
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount, fetchProducts dependency is handled inside the hook

  const handleSeeMore = () => {
    fetchProducts();
  };

  return (
    <>
      <main className="grow min-h-screen px-8 md:px-20 py-12 bg-gray-100">
        <section>
          <Header />
          {/* Pass the loadingRef to the ProductGrid for infinite scrolling */}
          <ProductGrid products={products} loadingRef={loadingRef} />
          {/* Show loading indicator only when loading more products */}
          {loading && <LoadingIndicator />}
          {/* Show "See more" button when there are more products and not currently loading */}
          {hasMore && !loading && <SeeMoreButton onClick={handleSeeMore} />}
        </section>
      </main>
    </>
  );
}

export default App;