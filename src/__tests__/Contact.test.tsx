import { render, screen } from "@testing-library/react";
import Contact from "../components/Contact";
import { contactEmail, gmailComposeLink } from "../mocks/siteData";

describe("Contact component", () => {
  test("renders the contact heading and email address", () => {
    render(<Contact />);

    expect(screen.getByRole("heading", { name: /ready to start your it journey/i })).toBeInTheDocument();
    expect(screen.getByText(contactEmail)).toBeInTheDocument();
  });

  test("provides working contact links", () => {
    render(<Contact />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).toHaveAttribute("href", gmailComposeLink));
  });
});
