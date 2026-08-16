import { render, screen } from "@testing-library/react";
import VideoSection from "../components/VideoSection";

describe("VideoSection component", () => {
  test("renders the watch and learn content", () => {
    render(<VideoSection />);

    expect(screen.getByText(/watch & learn/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /see how mentoring can support/i })).toBeInTheDocument();
    expect(screen.getByText(/Stellar Groupware Inc. focuses on practical IT training/i)).toBeInTheDocument();
  });

  test("renders the career mentoring video with an accessible title", () => {
    render(<VideoSection />);

    const video = screen.getByTitle("Career mentoring video");
    expect(video.tagName).toBe("IFRAME");
    expect(video).toHaveAttribute("src", "https://www.youtube.com/embed/XoZdIzjFIFE");
    expect(video).toHaveAttribute("allowfullscreen");
  });
});
