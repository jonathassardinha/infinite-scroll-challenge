import { ProductGallery } from "../../features/products/components/ProductGallery/ProductGallery.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export const Products = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <section className="h-full w-screen-xl">
      <div className="text-5xl font-extralight text-black mb-12">
        <span>Home Office</span>
        <p>Essentials.</p>
      </div>

      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary, error }) => (
          <div>
            <h2>There was an error!</h2>
            <p>{error.message}</p>
            <button onClick={() => resetErrorBoundary()}>Try again</button>
          </div>
        )}
      >
        <ProductGallery />
      </ErrorBoundary>
    </section>
  );
};
