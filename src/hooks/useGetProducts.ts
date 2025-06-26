import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async ({ pageParam = 0 }) => {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=10&skip=${pageParam}`,
  );
  console.log("fetchProducts res:", res.data);
  console.log("pageParam:", pageParam);
  return res.data;
};

export const useGetProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });
};
