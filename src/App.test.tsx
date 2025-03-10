// src/App.test.tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

// Create mock function to track calls
const mockFetchProducts = jest.fn().mockImplementation(() => Promise.resolve());

// Mock the hooks
jest.mock('./hooks/useProductFetch', () => ({
  useProductFetch: () => ({
    products: [
      { id: '1', title: 'Product 1', price: 10, description: 'Description 1', images: ['img1.jpg'] },
      { id: '2', title: 'Product 2', price: 20, description: 'Description 2', images: ['img2.jpg'] },
    ],
    loading: false,
    hasMore: true,
    error: null,
    fetchProducts: mockFetchProducts,
    resetProducts: jest.fn(),
  }),
}));

jest.mock('./hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: () => ({
    current: document.createElement('div')
  }),
}));

// Type definitions for component props
interface LoadingIndicatorProps {
  type: string;
}

interface ProductGridProps {
  products: Array<{
    id: string;
    title: string;
    price: number;
    description: string;
    images: string[];
  }>;
}

interface SeeMoreButtonProps {
  onClick: () => void;
}

// Mock the components to simplify testing
jest.mock('./components', () => ({
  Header: () => <div data-testid="header">Header</div>,
  LoadingIndicator: ({ type }: LoadingIndicatorProps) => <div data-testid={`loading-${type}`}>Loading {type}</div>,
  ProductGrid: ({ products }: ProductGridProps) => (
    <div data-testid="product-grid">
      {products.map(product => <div key={product.id} data-testid={`product-${product.id}`}>{product.title}</div>)}
    </div>
  ),
  SeeMoreButton: ({ onClick }: SeeMoreButtonProps) => <button data-testid="see-more" onClick={onClick}>See More</button>,
  ProductCard: () => <div>Product Card</div>,
}));

describe('App Component', () => {
  // Completely suppress console.error during tests
  const originalError = console.error;
  
  beforeAll(() => {
    // Replace console.error with a no-op function
    console.error = jest.fn();
  });
  
  afterAll(() => {
    // Restore original console.error
    console.error = originalError;
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should call fetchProducts on initial load', async () => {
    await act(async () => {
      render(<App />);
      // Allow async operations to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(mockFetchProducts).toHaveBeenCalledTimes(1);
  });

  it('should render product grid when not in initial loading state', async () => {
    // Mock setInitialLoading to immediately set it to false
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, jest.fn()]);
    
    await act(async () => {
      render(<App />);
      // Allow async operations to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });

  it('should call fetchProducts when see more button is clicked', async () => {
    // Reset mock count
    mockFetchProducts.mockClear();
    
    // Mock useState to immediately set initialLoading to false 
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, jest.fn()]);
    
    // Render the app
    await act(async () => {
      render(<App />);
      // Allow async operations to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // First call happens on initial render
    expect(mockFetchProducts).toHaveBeenCalledTimes(1);
    
    // Clean the mock to isolate the next call
    mockFetchProducts.mockClear();
    
    // Find and click the see more button
    const seeMoreButton = screen.getByTestId('see-more');
    
    // Simulate button click with act
    await act(async () => {
      seeMoreButton.click();
      // Allow async operations to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Should have been called once more after clearing the previous calls
    expect(mockFetchProducts).toHaveBeenCalledTimes(1);
  });
});