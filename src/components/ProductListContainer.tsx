import { useGetProducts } from "@hooks/useGetProducts";
import { Card } from "./Card";
import { ProductLayout } from "@layouts/ProductLayout";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Spinner } from "./Spinner";

// IMPROVEMENT: Add to types folder if used elsewhere
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  reviews: Review[];
}

interface Review {
  rating: number;
  comment: string;
  date: string;
}

export const ProductListContainer = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useGetProducts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div
        className="text-center text-red-600 my-4"
        role="alert"
        aria-live="assertive" // We need to let the screen reader know of changes immediately
      >
        Error loading products:{" "}
        {"message" in error && typeof error.message === "string"
          ? error.message
          : "Please try again later."}
      </div>
    );
  }

  return (
    <>
      <ProductLayout>
        {data?.pages.map((page) =>
          page.products.map((product: Product) => (
            <Card
              key={product.id}
              title={product.title}
              price={product.price}
              images={product.images}
              reviews={product.reviews.length}
              id={product.id}
            />
          )),
        )}
      </ProductLayout>

      {hasNextPage && !isFetchingNextPage && <div ref={ref} />}
      {isFetchingNextPage && (
        <div
          className="flex justify-center items-center my-2"
          aria-label="Loading more products" // No text when loading more (just a spinner) so provide aria label for screen readers
          aria-live="polite" // Announce updates without interrupting the user for screen readers
          role="status"
        >
          <Spinner />
        </div>
      )}
      {!hasNextPage && (
        <p
          className="flex justify-center my-2"
          role="status"
          aria-live="polite"
        >
          No more products.
        </p>
      )}
      <div className="border-b mb-8" />
    </>
  );
};
