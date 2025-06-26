import { memo } from "react";

export const SeeMoreProductsButton = memo(() => {
  return (
    <button
      className="bg-gray-200 px-8 py-2 rounded-full mx-auto"
      aria-label="See more products"
      title="See more products"
    >
      <img
        src="/arrow-right.svg"
        alt=""
        role="presentation"
        width={24}
        height={24}
      />
    </button>
  );
});
