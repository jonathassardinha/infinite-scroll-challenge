import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, renderHook } from "@testing-library/react";
import { VirtuosoGridMockContext } from "react-virtuoso";
import type { FC, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductGallery } from "../components/ProductGallery/ProductGallery.tsx";
import { Product } from "../../../services/products.service";
import { useProductsQueryData } from "../hooks/useProductsQueryData";

const LIMIT = 10;

const mockProducts = (skip: number) =>
  Array.from(
    { length: 10 },
    (_, i) =>
      ({
        id: skip + i + 1,
        title: `Product ${skip + i + 1}`,
        price: (i + 1) * 10,
        description: "x",
        images: ["imageurl"],
      }) satisfies Product,
  );

const mockProductResponse = (skip: number, total: number) => ({
  products: mockProducts(skip),
  total,
  skip,
  limit: 10,
});

describe("ProductGallery", () => {
  let queryClient: QueryClient;
  let wrapper: FC<{ children: ReactNode }>;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <VirtuosoGridMockContext.Provider
          value={{
            viewportHeight: 600,
            viewportWidth: 1280,
            itemHeight: 540,
            itemWidth: 410,
          }}
        >
          {children}
        </VirtuosoGridMockContext.Provider>
      </QueryClientProvider>
    );

    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    render(<ProductGallery />, { wrapper });

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should render products after loading", async () => {
    const mockData = mockProductResponse(0, LIMIT);

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { container } = render(<ProductGallery />, { wrapper });

    await waitFor(() => {
      expect(container).toMatchSnapshot();
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });
  });

  it("should not render products outside the virtualization boundary", async () => {
    const mockData = mockProductResponse(0, LIMIT);

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    render(<ProductGallery />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.queryByText("Product 9")).not.toBeInTheDocument();
    });
  });

  it("should load more products when scrolling", async () => {
    const mockData1 = mockProductResponse(0, LIMIT);
    const mockData2 = mockProductResponse(10, LIMIT);

    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockData1),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockData2),
        }),
    );

    const { result } = renderHook(() => useProductsQueryData(LIMIT, 0), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(mockData1.products);
    });

    await result.current.fetchNextPage();

    await waitFor(() => {
      expect(result.current.data).toStrictEqual([
        ...mockData1.products,
        ...mockData2.products,
      ]);
    });
  });
});
