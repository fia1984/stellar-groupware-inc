import { render, screen } from "@testing-library/react";
import Services from "../components/Services";
import { serviceCards } from "../constants/siteData";

describe("Services component", () => {
  test("renders the services heading and all service cards", () => {
    render(<Services />);

    expect(screen.getByRole("heading", { name: /comprehensive support/i })).toBeInTheDocument();
    serviceCards.forEach((service) => {
      expect(screen.getByRole("heading", { name: service.title })).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
    });
  });

  test("renders each service inside its own article card", () => {
    render(<Services />);

    serviceCards.forEach((service) => {
      const heading = screen.getByRole("heading", { name: service.title });
      expect(heading.closest("article")).toBeInTheDocument();
    });
  });
});
