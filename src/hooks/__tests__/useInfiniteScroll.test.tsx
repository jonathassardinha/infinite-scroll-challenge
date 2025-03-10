import { renderHook } from '@testing-library/react-hooks';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';

describe('useInfiniteScroll', () => {
  let mockIntersectionObserver: {
    observe: jest.Mock;
    disconnect: jest.Mock;
    unobserve: jest.Mock;
  };
  
  // Simplified mock approach that focuses on the behavior we need to test
  beforeEach(() => {
    mockIntersectionObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn()
    };
    
    // @ts-ignore - we're mocking the implementation
    window.IntersectionObserver = jest.fn(() => mockIntersectionObserver);
    
    // Mock the HTMLDivElement.prototype methods if needed
    // This helps ensure our tests work regardless of the test environment
    jest.spyOn(global.HTMLDivElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should create a ref', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useInfiniteScroll(false, true, callback));
    
    expect(result.current).toBeDefined();
  });

  it('should initialize IntersectionObserver', () => {
    const callback = jest.fn();
    renderHook(() => useInfiniteScroll(false, true, callback));
    
    // Verify the IntersectionObserver was created with expected options
    expect(window.IntersectionObserver).toHaveBeenCalled();
    
    // Get the options passed to IntersectionObserver constructor
    const options = (window.IntersectionObserver as jest.Mock).mock.calls[0][1];
    
    // Verify the expected options
    expect(options).toHaveProperty('rootMargin', '250px');
    expect(options).toHaveProperty('threshold', 0.1);
  });

  it('should not trigger callback when hasMore=false', () => {
    const callback = jest.fn();
    renderHook(() => useInfiniteScroll(false, false, callback));
    
    // Simulate intersection
    const [observerCallback] = (window.IntersectionObserver as jest.Mock).mock.calls[0];
    observerCallback([{ isIntersecting: true }]);
    
    // The callback should not be called because hasMore is false
    expect(callback).not.toHaveBeenCalled();
  });

  it('should disconnect observer on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInfiniteScroll(false, true, callback));
    
    unmount();
    
    expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
  });
});