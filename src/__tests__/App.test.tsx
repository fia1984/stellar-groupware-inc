import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders the company name", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: "Stellar Groupware Inc." })
    ).toBeInTheDocument();
  });

  it("renders service cards from mock data", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "IT Training" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Job Support" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Career Guidance" })
    ).toBeInTheDocument();
  });

  it("has working contact links", () => {
    render(<App />);

    const contactNowLink = screen.getByRole("link", { name: "Contact Now" });

    expect(contactNowLink).toHaveAttribute(
      "href",
      "https://mail.google.com/mail/?view=cm&fs=1&to=fia@stellartms.com"
    );
  });
});
