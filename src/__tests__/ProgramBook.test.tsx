import { act, fireEvent, render, screen } from "@testing-library/react";
import ProgramBook, { bookCoverLines } from "../components/ProgramBook";

describe("ProgramBook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("puts Career and Marketing on separate cover lines", () => {
    expect(bookCoverLines("Career Marketing")).toEqual(["Career", "Marketing"]);
    expect(bookCoverLines("Direct Marketing Program")).toEqual([
      "Direct Marketing",
      "Program",
    ]);
  });

  it("stays closed until Enroll Now is clicked, then opens", () => {
    render(
      <ProgramBook
        title="Career Marketing"
        href="/enroll?program=Career%20Marketing"
      />,
    );

    const book = document.querySelector(".program-book");
    const enrollLink = screen.getByRole("link", { name: /Enroll Now/ });

    expect(book).not.toHaveClass("is-open");
    expect(enrollLink).toHaveAttribute("aria-expanded", "false");
    expect(book?.textContent).toContain("Career");
    expect(book?.textContent).toContain("Marketing");
    expect(book?.textContent).not.toContain("Stellar pathway");

    fireEvent.click(enrollLink);

    expect(book).toHaveClass("is-open");
    expect(enrollLink).toHaveAttribute("aria-expanded", "true");
    expect(window.open).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(650);
    });

    expect(window.open).toHaveBeenCalledWith(
      "/enroll?program=Career%20Marketing",
      "_blank",
      "noopener,noreferrer",
    );
  });
});
