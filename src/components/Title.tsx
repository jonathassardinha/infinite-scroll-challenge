import { FC } from "react";

type TitleProps = {
  title: string;
  additionalTitle?: string;
};

export const Title: FC<TitleProps> = ({ title, additionalTitle }) => {
  return (
    <header className="mb-20">
      <h1 className="text-4xl md:text-5xl font-extralight text-black">
        {title}
      </h1>
      {additionalTitle && (
        <h2 className="text-4xl md:text-5xl font-light text-gray-700 mt-2">
          {additionalTitle}
        </h2>
      )}
    </header>
  );
};
