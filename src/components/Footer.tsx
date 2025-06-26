import { FC, ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
  className?: string;
}

export const Footer: FC<FooterProps> = ({ children, className }) => {
  return (
    <footer
      className={`${className} flex justify-center flex-col text-4xl font-light mb-4 mx-auto`}
    >
      {children}
    </footer>
  );
};
