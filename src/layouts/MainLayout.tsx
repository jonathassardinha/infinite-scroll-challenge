import { Title } from "@components/Title";
import { FC, ReactNode } from "react";

type MainLayoutProps = {
  title: string;
  additionalTitle?: string;
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({
  title,
  additionalTitle,
  children,
}) => {
  return (
    <main className="grow h-screen max-h-screen px-20 py-12">
      <Title title={title} additionalTitle={additionalTitle} />
      <section className="flex flex-col h-full">{children}</section>
    </main>
  );
};
