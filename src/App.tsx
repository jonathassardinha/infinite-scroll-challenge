import { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";
import { Product } from "./Types";

const API_URL = "https://dummyjson.com/products";


const fetchProducts = async (limit: number, skip: number): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return [];
    }

    const data: unknown = await response.json();

    // Ensure response structure is valid before accessing properties
    if (typeof data === "object" && data !== null && "products" in data && Array.isArray(data.products)) {
      return data.products as Product[];
    }

    console.error("Invalid API response structure:", data);
    return [];
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const limit = 10;

  /**
   * Loads more products while ensuring proper state updates.
   */
  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newProducts = await fetchProducts(limit, page * limit);
      setProducts((prev) => [...prev, ...newProducts]);

      // If new products fetched are less than limit, assume no more data
      setHasMore(newProducts.length === limit);

      // Only update page if new products were fetched
      if (newProducts.length > 0) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    loadMoreProducts();
  }, []); // Intentional empty dependency array to fetch only on mount

  /**
   * Intersection Observer callback for infinite scrolling.
   */
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreProducts();
          }
        },
        { threshold: 1.0 },
      );

      if (node) observer.current.observe(node);
    },
    [loading, loadMoreProducts],
  );

  return (
    <main className="grow h-screen max-h-screen px-20 py-12 bg-gray-100 overflow-y-auto">
      <section className="h-full max-w-[1200px] mx-auto">
        <div className="text-5xl font-extralight text-black mb-20">
          <span>Home Office</span>
          <p>Essentials.</p>
        </div>

        {/* Grid with exactly 3 columns */}
        <div className="flex flex-wrap -mx-2">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              refCallback={index === products.length - 1 ? lastProductRef : undefined}
            />
          ))}
        </div>

        {loading && <p className="text-center text-lg mt-6">Loading...</p>}
      </section>
    </main>
  );
}

export default App;
