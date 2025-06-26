// Card.tsx
import { FC } from "react";
import { ImageSlider } from "./ImageSlider";

interface CardProps {
  title: string;
  price: number;
  reviews: number;
  images: string[];
  id: number;
}

export const Card: FC<CardProps> = ({ title, price, reviews, images }) => {
  return (
    <li className="bg-gray-200 p-4 flex flex-col gap-4 w-full max-w-[400px] mx-auto">
      <article>
        <div className="flex items-center justify-between">
          <span className="text-sm bg-orange-100/60 px-4 py-1 rounded-full">
            {reviews} reviews
          </span>
          <button
            className="text-sm bg-white/60 px-4 py-1 rounded-full"
            aria-label={`Customize ${title}`}
          >
            Customize
          </button>
        </div>

        <ImageSlider images={images} />

        <div className="bg-white p-3 gap-3 flex items-center rounded">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-400">From ${price}</p>
          </div>
          <div className="w-px self-stretch bg-gray-400 ml-auto" />
          <img
            src="/shopping-cart.svg"
            alt=""
            role="presentation"
            className="mr-2 ml-1"
            width={24}
            height={24}
          />
        </div>
      </article>
    </li>
  );
};
