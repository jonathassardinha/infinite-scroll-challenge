// Export all components from their folders
export { default as Header } from './Header/Header';
export { default as LoadingIndicator } from './LoadingIndicator/LoadingIndicator';
export { default as ProductGrid } from './ProductGrid/ProductGrid';
export { default as SeeMoreButton } from './SeeMoreButton/SeeMoreButton';

// We also need to export the ProductCard and its type
export { default as ProductCard } from './ProductCard/ProductCard';
export type { ProductType } from './ProductCard/ProductCard';