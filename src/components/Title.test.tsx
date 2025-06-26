import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Title } from "./Title";

describe("Title component", () => {
  it("renders the main title", () => {
    render(<Title title="Main Title" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Main Title",
    );
  });

  it("renders both main title and additional title", () => {
    render(<Title title="Main Title" additionalTitle="Subtitle" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Main Title",
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Subtitle",
    );
  });

  it("does not render additional title when not provided", () => {
    render(<Title title="Only Title" />);
    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
  });
});
