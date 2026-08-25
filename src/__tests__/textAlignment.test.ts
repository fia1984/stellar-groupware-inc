import { readFileSync } from "node:fs";
import path from "node:path";

const alignmentCss = readFileSync(
  path.join(__dirname, "../styles/25-text-alignment.css"),
  "utf8",
);
const headerCss = readFileSync(
  path.join(__dirname, "../styles/23-header-layout.css"),
  "utf8",
);
const programBookCss = readFileSync(
  path.join(__dirname, "../styles/26-program-book.css"),
  "utf8",
);

describe("site-wide text alignment", () => {
  it("left-aligns readable pricing, FAQ, and card copy", () => {
    expect(alignmentCss).toMatch(/\.price-card li[\s\S]*text-align:\s*left\s*!important/);
    expect(alignmentCss).toMatch(/\.pricing-faq-card[\s\S]*text-align:\s*left\s*!important/);
    expect(alignmentCss).toMatch(/\.review-card[\s\S]*text-align:\s*left\s*!important/);
  });

  it("keeps action buttons centered", () => {
    expect(alignmentCss).toMatch(/\.enroll-btn[\s\S]*text-align:\s*center\s*!important/);
  });

  it("centers home section titles and intro lines", () => {
    expect(alignmentCss).toMatch(/\.home-section-heading[\s\S]*text-align:\s*center\s*!important/);
    expect(alignmentCss).toMatch(/\.home-section-heading p[\s\S]*text-align:\s*center\s*!important/);
    expect(alignmentCss).toMatch(/\.reviews-heading[\s\S]*text-align:\s*center\s*!important/);
  });

  it("keeps program book covers centrally aligned", () => {
    expect(alignmentCss).toMatch(
      /\.program-book-title[\s\S]*text-align:\s*center\s*!important/,
    );
  });

  it("stacks pricing cards on small screens", () => {
    expect(alignmentCss).toContain("@media (max-width: 900px)");
    expect(alignmentCss).toMatch(/flex-direction:\s*column\s*!important/);
    expect(alignmentCss).toMatch(/width:\s*100%\s*!important/);
  });
});

describe("mobile header", () => {
  it("keeps the collapsed header on one row", () => {
    expect(headerCss).toContain("@media (max-width: 1050px)");
    expect(headerCss).toMatch(/flex-wrap:\s*nowrap\s*!important/);
    expect(headerCss).toMatch(/flex-direction:\s*row\s*!important/);
  });
});

describe("program book layout", () => {
  it("does not treat the 285px card size as height", () => {
    expect(programBookCss).toMatch(/flex-basis:\s*auto\s*!important/);
    expect(programBookCss).toMatch(/height:\s*auto\s*!important/);
    expect(programBookCss).toMatch(/overflow:\s*hidden\s*!important/);
  });

  it("centers the book and cover text", () => {
    expect(programBookCss).toMatch(/\.program-book-block \{[\s\S]*align-items:\s*center/);
    expect(programBookCss).toMatch(/\.program-book-title[\s\S]*text-align:\s*center\s*!important/);
    expect(programBookCss).toMatch(/width:\s*fit-content/);
    expect(programBookCss).toMatch(/margin-left:\s*auto/);
    expect(programBookCss).toMatch(/margin-inline:\s*auto/);
  });

  it("places cover titles under the S with a small gap, not at the bottom", () => {
    expect(programBookCss).toMatch(/\.program-book-cover \{[\s\S]*justify-content:\s*flex-start/);
    expect(programBookCss).toMatch(/\.program-book-title \{[\s\S]*margin:\s*8px 0 0/);
    expect(programBookCss).not.toMatch(/\.program-book-title \{[\s\S]*bottom:\s*12px/);
  });
});
