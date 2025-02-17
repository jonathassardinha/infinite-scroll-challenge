import React from "react";
import { ProductCardProps } from "../Types";

const FALLBACK_IMAGE = "https://placehold.co/600x400/EEE/31343C";

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, refCallback }) => {
  const { title, price, images } = product;
  const productImage = images?.length > 0 ? images[0] : FALLBACK_IMAGE;

  return (
    <div ref={refCallback} className="product-card w-full md:w-1/3 px-2 mb-6">
      <div className="bg-gray-200 p-4 flex flex-col h-full">
        {/* Badge and Button */}
        <div className="flex items-center justify-between">
          <span className="text-sm bg-orange-100/60 px-4 py-1 rounded-full">
            Some badge
          </span>
          <button className="text-sm bg-white/60 px-4 py-1 rounded-full">
            Customize
          </button>
        </div>

        {/* Image */}
        <img
          src={productImage}
          alt={title}
          className="h-60 w-full object-cover mt-2"
          loading="lazy"
        />

        {/* Item Options (Pinned to Bottom) */}
        <div className="mt-auto bg-white p-3 flex items-center">
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-gray-400">From £{price}</p>
          </div>
          <div className="w-px self-stretch bg-gray-400 ml-auto" />
          <img
            src="/shopping-cart.svg"
            alt="Shopping cart icon"
            className="mr-2 ml-1"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
