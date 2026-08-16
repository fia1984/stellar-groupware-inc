import { render, screen } from "@testing-library/react";
import Hero from "../components/Hero";

describe("Hero component", () => {
  test("renders the main career heading and supporting content", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { name: /upgrade your it career/i })).toBeInTheDocument();
    expect(screen.getByText(/it training • mentoring • job support/i)).toBeInTheDocument();
    expect(screen.getByText(/Stellar Groupware Inc. helps learners/i)).toBeInTheDocument();
  });

  test("provides consultation and program links", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /book free consultation/i })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: /explore programs/i })).toHaveAttribute("href", "#training");
  });
});
