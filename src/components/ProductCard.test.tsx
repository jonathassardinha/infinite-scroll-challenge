import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ProductCard from "../components/ProductCard";
import { Product } from "../Types";
import { describe, expect, it, vi } from "vitest";


// Mock product data
const mockProduct: Product = {
  id: "1",
  title: "Test Product",
  price: "29.99",
  images: ["https://placehold.co/600x400"],
  description: ""
};

// Mock ref callback function
const mockRefCallback = vi.fn();

describe("ProductCard Component", () => {
  it("renders product title and price correctly", () => {
    render(<ProductCard product={mockProduct} refCallback={mockRefCallback} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("From £29.99")).toBeInTheDocument();
  });

  it("renders the product image correctly", () => {
    render(<ProductCard product={mockProduct} refCallback={mockRefCallback} />);
    
    const image = screen.getByRole("img", { name: /test product/i });
    expect(image).toHaveAttribute("src", mockProduct.images[0]);
    expect(image).toHaveAttribute("alt", "Test Product"); // Ensures alt text is present for accessibility
  });

  it("uses fallback image when product has no images", () => {
    const productWithoutImages: Product = { ...mockProduct, images: [] };

    render(<ProductCard product={productWithoutImages} refCallback={mockRefCallback} />);
    
    const image = screen.getByRole("img", { name: /test product/i });
    expect(image).toHaveAttribute("src", "https://placehold.co/600x400/EEE/31343C");
    expect(image).toHaveAttribute("alt", "Test Product");
  });

  it("renders Customize button and badge", () => {
    render(<ProductCard product={mockProduct} refCallback={mockRefCallback} />);
    
    expect(screen.getByText("Customize")).toBeInTheDocument();
    expect(screen.getByText("Some badge")).toBeInTheDocument();
  });
});
