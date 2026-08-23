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

describe("site-wide text alignment", () => {
  it("left-aligns readable pricing, FAQ, and card copy", () => {
    expect(alignmentCss).toMatch(/\.price-card li[\s\S]*text-align:\s*left\s*!important/);
    expect(alignmentCss).toMatch(/\.pricing-faq-card[\s\S]*text-align:\s*left\s*!important/);
    expect(alignmentCss).toMatch(/\.review-card[\s\S]*text-align:\s*left\s*!important/);
  });

  it("keeps action buttons centered", () => {
    expect(alignmentCss).toMatch(/\.enroll-btn[\s\S]*text-align:\s*center\s*!important/);
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
