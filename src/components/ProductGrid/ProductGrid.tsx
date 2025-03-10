import React from 'react';
import ProductCard, { ProductType } from '@components/ProductCard/ProductCard';

type ProductGridProps = {
    products: ProductType[];
    loadingRef?: React.RefObject<HTMLDivElement>;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, loadingRef }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            {/* This empty div with the ref will trigger the loading of more products when it becomes visible */}
            {loadingRef && <div ref={loadingRef} className="h-24 mt-4 col-span-full flex items-center justify-center"></div>}
        </div>
    );
};

export default ProductGrid;