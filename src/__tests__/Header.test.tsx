import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header component", () => {
  test("renders the Stellar brand and navigation", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Stellar", { exact: true })).toBeInTheDocument();
    expect(screen.getByText("Groupware", { exact: true })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get started/i })).toBeInTheDocument();
  });

  test("links the primary header actions to the correct sections", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: /stellar groupware inc/i })).toHaveAttribute("href", "#home");
    expect(screen.getByRole("link", { name: /get started/i })).toHaveAttribute("href", "#contact");
  });
});
