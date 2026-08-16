import { render, screen } from "@testing-library/react";
import Process from "../components/Process";
import { processSteps } from "../mocks/siteData";

describe("Process component", () => {
  test("renders the process heading and every process step", () => {
    render(<Process />);

    expect(screen.getByRole("heading", { name: /clear pathway for learning/i })).toBeInTheDocument();
    processSteps.forEach((step) => {
      expect(screen.getByRole("heading", { name: step.title })).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  test("shows the process cards in the supplied order", () => {
    render(<Process />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(processSteps.length);
    processSteps.forEach((step, index) => {
      expect(cards[index]).toHaveTextContent(step.title);
    });
  });
});
