import React from 'react';

export type ProductType = {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
};

type ProductCardProps = {
    product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-gray-200 p-4 flex flex-col gap-4 w-fit">
            <div className="flex items-center justify-between">
                <span className="text-sm bg-orange-100/60 px-4 py-1 rounded-full">
                    New
                </span>
                <button className="text-sm bg-white/60 px-4 py-1 rounded-full">
                    Customize
                </button>
            </div>
            <img
                src={product.images[0]}
                alt={product.title}
                width={400}
                height={400}
                className="object-cover h-[300px]"
            />
            <div className="bg-white p-3 gap-3 flex items-center">
                <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-gray-400">From ${product.price}</p>
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
};

export default ProductCard;