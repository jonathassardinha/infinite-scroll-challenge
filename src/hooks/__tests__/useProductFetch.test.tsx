// src/hooks/__tests__/useProductFetch.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useProductFetch } from '@hooks/useProductFetch';

describe('useProductFetch', () => {
  const mockProducts = [
    { id: 1, title: 'Product 1', price: 10, description: 'Description 1', images: ['img1.jpg'] },
    { id: 2, title: 'Product 2', price: 20, description: 'Description 2', images: ['img2.jpg'] },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
    
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        products: mockProducts,
        total: 100,
        limit: 10,
        skip: 0
      })
    });
  });

  it('should initialize with empty products and loading=false', () => {
    const { result } = renderHook(() => useProductFetch());
    
    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('should fetch products successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProductFetch());
    
    act(() => {
      result.current.fetchProducts();
    });
    
    expect(result.current.loading).toBe(true);
    
    await waitForNextUpdate();
    
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.hasMore).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products?limit=10&skip=0',
      expect.any(Object)
    );
  });

  it('should handle fetch errors', async () => {
    // Temporarily mock console.error to prevent test output noise
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
    
    const { result, waitForNextUpdate } = renderHook(() => useProductFetch());
    
    act(() => {
      result.current.fetchProducts();
    });
    
    await waitForNextUpdate();
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network error');
    
    // Restore console.error
    console.error = originalConsoleError;
  });

  it('should increment page and append products on successive fetches', async () => {
    const mockProductsPage2 = [
      { id: 3, title: 'Product 3', price: 30, description: 'Description 3', images: ['img3.jpg'] },
      { id: 4, title: 'Product 4', price: 40, description: 'Description 4', images: ['img4.jpg'] },
    ];

    const { result, waitForNextUpdate } = renderHook(() => useProductFetch());
    
    // First fetch
    act(() => {
      result.current.fetchProducts();
    });
    
    await waitForNextUpdate();
    
    // Mock second page response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        products: mockProductsPage2,
        total: 100,
        limit: 10,
        skip: 10
      })
    });
    
    // Second fetch
    act(() => {
      result.current.fetchProducts();
    });
    
    await waitForNextUpdate();
    
    expect(result.current.products).toEqual([...mockProducts, ...mockProductsPage2]);
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      'https://dummyjson.com/products?limit=10&skip=10',
      expect.any(Object)
    );
  });

  it('should reset products when resetProducts is called', () => {
    const { result } = renderHook(() => useProductFetch());
    
    // Initialize some products first
    result.current.products = mockProducts as any;
    
    act(() => {
      result.current.resetProducts();
    });
    
    expect(result.current.products).toEqual([]);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.error).toBe(null);
  });
});