export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
};

export type ProductCardProps = {
  product: Product;
  refCallback?: (node: HTMLDivElement | null) => void;
};