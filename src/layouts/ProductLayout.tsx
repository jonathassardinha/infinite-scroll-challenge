import { FC, ReactNode } from "react";

interface ProductLayoutProps {
  children: ReactNode;
}

export const ProductLayout: FC<ProductLayoutProps> = ({ children }) => {
  return (
    <ul className="mb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {children}
    </ul>
  );
};
