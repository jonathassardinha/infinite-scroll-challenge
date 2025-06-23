import { ProductGalleryItem } from "../ProductGalleryItem/ProductGalleryItem.tsx";
import { VirtuosoGrid } from "react-virtuoso";
import { useProductsQueryData } from "../../hooks/useProductsQueryData.tsx";
import { Spinner } from "../../../../components/Spinner/Spinner.tsx";

const LIMIT = 10;
const SKIP = 10;

export const ProductGallery = () => {
  const { data, error, isFetching, totalCount, fetchNextPage } =
    useProductsQueryData(LIMIT, SKIP);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!isFetching && !error && !data?.length) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <VirtuosoGrid
      style={{
        height: "calc(100vh - 272px)",
        width: "100vw",
        maxWidth: "1280px",
      }}
      listClassName="grid gap-4 md:grid-cols-3 sm:grid-cols-2 justify-center max-w-screen-xl"
      itemClassName="max-h-[540px]"
      data={data}
      totalCount={totalCount}
      endReached={() => fetchNextPage()}
      increaseViewportBy={400}
      useWindowScroll={true}
      itemContent={(_, product) => <ProductGalleryItem product={product} />}
      components={{
        Footer: () =>
          isFetching ? (
            <div className="flex justify-center p-8">
              <Spinner />
            </div>
          ) : null,
      }}
    />
  );
};
