import { FC, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useForceUpdate } from "./hooks";
import { fetchProducts } from "./apis";

const ProductList: FC = () => {
    const forceUpdate = useForceUpdate();
    const paginationRef = useRef({
        limit: 10,
        skip: 0
    });
    const sentinelRef = useRef<HTMLDivElement>(null);
    const productListRef = useRef<Product[]>([]);
    const hasMoreRef = useRef(true);
    const loadingRef = useRef(false);
    const hasErrorRef = useRef(false);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const notYetReachedBottom = entries[0].intersectionRatio < 0;
                if (notYetReachedBottom || loadingRef.current) return;
                const { skip, limit } = paginationRef.current;
                hasErrorRef.current = false;
                loadingRef.current = true;
                forceUpdate(); // to re-render the list.
                fetchProducts(skip, limit)
                    .then(({ products, total }) => {
                        paginationRef.current.skip += limit;
                        productListRef.current = [...productListRef.current, ...products];
                        const hasMore = productListRef.current.length < total;
                        if (!hasMore) {
                            hasMoreRef.current = false;
                            intersectionObserver.disconnect();
                        }
                        loadingRef.current = false;
                        hasErrorRef.current = false;
                        forceUpdate();
                    })
                    .catch(() => {
                        loadingRef.current = false;
                        hasErrorRef.current = true;
                        forceUpdate();
                    })
            }
        );
        intersectionObserver.observe(
            sentinel
        );
        return () => {
            intersectionObserver.disconnect();
        }
    }, []);

    const loading = loadingRef.current;
    const hasMore = hasMoreRef.current;
    const products = productListRef.current;
    const hasError = hasErrorRef.current;

    return (
        <div>
            <section className="product-list">
                {
                    products.map((product => <ProductCard product={product} key={product.id} />))
                }
            </section>
            <div ref={sentinelRef} className="bottom-sentinel">
                {
                    hasMore === false && <div>No more products.</div>
                }
                {
                    loading && <div>Loading...</div>
                }
                {
                    hasError && <div>Ops.. Something's going wrong.</div>
                }
            </div>

        </div>
    )
}

export default ProductList