import { API_URL } from "../constants/api.ts";

interface Params {
  pageParam: {
    limit: number;
    skip: number;
  };
}

export const getProducts = async ({
  pageParam: { limit, skip },
}: Params): Promise<ProductsResponse> => {
  const url = `${API_URL}/products?limit=${limit}&skip=${skip}`;

  const response = await fetch(url);

  return response.json();
};

interface ProductsResponse {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};
