import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

// Mock API response data
const mockProducts = [
  { id: 1, title: "Product 1", price: 10, images: ["https://placehold.co/600x400"] },
  { id: 2, title: "Product 2", price: 20, images: ["https://placehold.co/600x400"] },
];

// Helper function to create a mock Response object
const mockFetchResponse = (data: unknown, status = 200) => {
  return Promise.resolve(
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  );
};

// Reset fetch mock before each test
beforeEach(() => {
  vi.restoreAllMocks();
});

// Mock global fetch function correctly
vi.stubGlobal("fetch", () => mockFetchResponse({ products: mockProducts }));

describe("App Component", () => {
  it("renders initial UI elements", () => {
    render(<App />);
    
    // Ensure title and description exist
    expect(screen.getByText("Home Office")).toBeInTheDocument();
    expect(screen.getByText("Essentials.")).toBeInTheDocument();
  });

  it("fetches and displays products correctly", async () => {
    render(<App />);

    // Wait for products to be displayed
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("From £10")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("From £20")).toBeInTheDocument();
    });
  });

  it("handles API failure gracefully", async () => {
    // Mock API failure response
    vi.stubGlobal("fetch", () => mockFetchResponse({}, 500));

    render(<App />);

    // Wait to ensure no products are rendered due to API failure
    await waitFor(() => {
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    });
  });
});
