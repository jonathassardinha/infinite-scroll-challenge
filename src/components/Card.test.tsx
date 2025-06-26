import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card component", () => {
  const mockProps = {
    title: "Dior Sauvage Elixir",
    price: 160,
    reviews: 3,
    images: ["https://test.com/test.jpg"],
    id: 123,
  };

  it("renders title, price, reviews, and first product image", () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(`From $${mockProps.price}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProps.reviews} reviews`),
    ).toBeInTheDocument();

    const image = screen.getByAltText("Product image 1") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockProps.images[0]);
  });
});
