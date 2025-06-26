import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import { useGetProducts } from "./useGetProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const createTestQueryClient = () => new QueryClient();

describe("useGetProducts", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches initial products and handles pagination correctly", async () => {
    // Mock the first page
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        products: [{ id: 1, title: "Product 1" }],
        total: 20,
        skip: 0,
        limit: 10,
      },
    });

    // Mock the second page to ensure we fetch and append correctly
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        products: [{ id: 2, title: "Product 2" }],
        total: 20,
        skip: 10,
        limit: 10,
      },
    });

    const queryClient = createTestQueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useGetProducts(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0].products[0].title).toBe("Product 1");

    await result.current.fetchNextPage();
    await waitFor(() => expect(result.current.isFetchingNextPage).toBe(false));

    expect(result.current.data?.pages[1].products[0].title).toBe("Product 2");
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
});
