import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts, Product } from "../../../services/products.service.ts";
import { useMemo } from "react";

export const useProductsQueryData = (limit: number, skip: number) => {
  const { data, error, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: { limit, skip: 0 },
    getNextPageParam: (lastPage) => ({
      limit,
      skip: lastPage.skip + skip,
    }),
  });

  const productData = useMemo(() => {
    return (
      data?.pages.reduce<Product[]>(
        (products, page) => products.concat(page.products),
        [],
      ) ?? []
    );
  }, [data]);

  const errorMessage = useMemo(() => {
    if (!error) return null;

    return error.message ?? "Unknown error occurred";
  }, [error]);

  const totalCount = useMemo(() => data?.pages[0]?.total, [data]);

  return {
    data: productData,
    error: errorMessage,
    isFetching,
    totalCount,
    fetchNextPage,
  };
};
