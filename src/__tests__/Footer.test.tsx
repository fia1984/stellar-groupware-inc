import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer component", () => {
  test("renders the company information and footer sections", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText(/stellar groupware/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quick Links" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Resources" })).toBeInTheDocument();
  });

  test("renders the required navigation and support links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Training" })).toHaveAttribute("href", "/training");
    expect(screen.getAllByRole("link", { name: /customer support/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/© 2026 Stellar Groupware Inc\./i)).toBeInTheDocument();
  });
});
