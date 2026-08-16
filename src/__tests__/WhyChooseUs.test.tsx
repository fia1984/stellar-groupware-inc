import { render, screen } from "@testing-library/react";
import WhyChooseUs from "../components/WhyChooseUs";
import { benefits } from "../mocks/siteData";

describe("WhyChooseUs component", () => {
  test("renders the section heading and introduction", () => {
    render(<WhyChooseUs />);

    expect(screen.getByText(/why choose us/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /guidance built around real learning/i })).toBeInTheDocument();
    expect(screen.getByText(/gives learners clear support/i)).toBeInTheDocument();
  });

  test("renders every benefit with a confirmation mark", () => {
    render(<WhyChooseUs />);

    benefits.forEach((benefit) => expect(screen.getByText(benefit)).toBeInTheDocument());
    expect(screen.getAllByText("✓")).toHaveLength(benefits.length);
  });
});
