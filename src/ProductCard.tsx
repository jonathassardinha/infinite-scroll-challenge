import { FC } from "react";
export interface ProductCardProps {
    product: Product
}
const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            <img className="product-card-img" src={product.thumbnail} alt={product.title} />
            <strong>{product.title}</strong>
            <div>{`From $${product.price}`}</div>
        </div>
    )
}

export default ProductCard