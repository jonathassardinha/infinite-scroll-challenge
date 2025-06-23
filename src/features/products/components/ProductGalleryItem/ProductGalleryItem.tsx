import { Product } from "../../../../services/products.service.ts";

interface Props {
  product: Product;
}

export const ProductGalleryItem = ({
  product: { title, price, images, description },
}: Props) => (
  <div className="bg-gray-200 p-4 flex flex-col gap-4 w-fit">
    <div className="flex items-center justify-between">
      <span className="text-sm bg-orange-100/60 px-4 py-1 rounded-full">
        Some badge
      </span>
      <button className="text-sm bg-white/60 px-4 py-1 rounded-full">
        Customize
      </button>
    </div>
    <img src={images[0]} alt={description} width={400} height={400} />
    <div className="bg-white p-3 gap-3 flex items-center">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-400">From ${price}</p>
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
);
