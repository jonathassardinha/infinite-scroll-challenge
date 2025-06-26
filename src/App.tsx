import "./App.css";
import { ProductListContainer } from "@components/ProductListContainer";
import { MainLayout } from "@layouts/MainLayout";
import { SeeMoreProductsButton } from "@components/button";
import { Footer } from "@components/Footer";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";

/**
 * @ErrorFallback to handle errors gracefully and display them to the user
 * @param param0
 * @returns
 */
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div role="alert" className="p-4 border border-red-400 rounded bg-red-100">
      <p>An error has occurred.</p>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          {/* IMPROVEMENT: Use internationalisation (i18) to support different languages (especially import for different markets) */}
          <MainLayout title={t("title")} additionalTitle={t("additionalTitle")}>
            <ProductListContainer />

            {/* Use semantic HTML for better a11y */}
            <Footer>
              <h3 className="mb-2">See more products</h3>
              <SeeMoreProductsButton />
            </Footer>
          </MainLayout>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default App;
