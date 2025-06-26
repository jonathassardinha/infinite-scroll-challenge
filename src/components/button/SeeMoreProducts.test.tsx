import { render, screen } from "@testing-library/react";
import { SeeMoreProductsButton } from "./SeeMoreProductsButton";

describe("SeeMoreProductsButton", () => {
  it("renders correctly", () => {
    render(<SeeMoreProductsButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
