import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => (
  <main className="grow px-20 py-12 bg-gray-100 flex justify-center">
    {children}
  </main>
);
