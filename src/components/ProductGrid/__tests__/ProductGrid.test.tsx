// src/components/ProductGrid/__tests__/ProductGrid.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductGrid } from '@components/index';

// Mock the ProductCard component to simplify testing
jest.mock('../../ProductCard/ProductCard', () => {
  return {
    __esModule: true,
    default: ({ product }: { product: any }) => <div data-testid={`product-${product.id}`}>{product.title}</div>
  };
});

describe('ProductGrid', () => {
  const mockProducts = [
    { id: '1', title: 'Product 1', price: 10, description: 'Description 1', images: ['img1.jpg'] },
    { id: '2', title: 'Product 2', price: 20, description: 'Description 2', images: ['img2.jpg'] },
  ];

  it('should render products', () => {
    render(<ProductGrid products={mockProducts} />);
    
    expect(screen.getByTestId(`product-${mockProducts[0].id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`product-${mockProducts[1].id}`)).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should render loading ref div when loadingRef is provided', () => {
    const loadingRef = React.createRef<HTMLDivElement>();
    const { container } = render(<ProductGrid products={mockProducts} loadingRef={loadingRef} />);
    
    // Find the div with ref set to loadingRef
    const loadingDivs = container.querySelectorAll('.col-span-full');
    expect(loadingDivs.length).toBe(1);
  });

  it('should not render loading ref div when loadingRef is not provided', () => {
    const { container } = render(<ProductGrid products={mockProducts} />);
    
    // No loading div should be present
    const loadingDivs = container.querySelectorAll('.col-span-full');
    expect(loadingDivs.length).toBe(0);
  });
});