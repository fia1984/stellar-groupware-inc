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
const mobileSafeCss = readFileSync(
  path.join(__dirname, "../styles/27-mobile-page-safe.css"),
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

  it("does not shrink full-bleed heroes with auto side margins", () => {
    expect(alignmentCss).not.toMatch(/\.about-hero,[\s\S]*margin-left:\s*auto\s*!important/);
    expect(alignmentCss).not.toMatch(/\.process-hero,[\s\S]*margin-left:\s*auto\s*!important/);
    expect(alignmentCss).not.toMatch(/\.training-page-hero,[\s\S]*margin-left:\s*auto\s*!important/);
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

describe("home stats count-up", () => {
  it("counts from 0 over two seconds when the stats bar enters view", () => {
    const appSource = readFileSync(
      path.join(__dirname, "../App.tsx"),
      "utf8",
    );
    expect(appSource).toMatch(/duration = 2000/);
    expect(appSource).toContain("IntersectionObserver");
    expect(appSource).toContain("toLocaleString()");
    expect(appSource).toContain("setValue(0)");
  });
});

describe("mobile page safety", () => {
  it("clips horizontal overflow and keeps the home hero inside the screen", () => {
    expect(mobileSafeCss).toMatch(/overflow-x:\s*clip/);
    expect(mobileSafeCss).toContain("@media (max-width: 1050px)");
    expect(mobileSafeCss).toMatch(/\.hero-content[\s\S]*left:\s*auto\s*!important/);
    expect(mobileSafeCss).toMatch(/transform:\s*none\s*!important/);
    expect(mobileSafeCss).toMatch(/grid-template-columns:\s*1fr\s*!important/);
  });

  it("keeps breadcrumbs on one aligned row", () => {
    expect(mobileSafeCss).toMatch(
      /\.breadcrumb-strip \{[\s\S]*align-items:\s*center\s*!important/,
    );
    expect(mobileSafeCss).toMatch(
      /\.breadcrumb-strip > \*[\s\S]*height:\s*36px\s*!important/,
    );
  });

  it("keeps the chat bubble off Enroll Now buttons", () => {
    expect(mobileSafeCss).toMatch(
      /a\.stellar-chat-bubble \{[\s\S]*bottom:\s*max\(20px/,
    );
    expect(mobileSafeCss).toMatch(
      /\.price-card \.enroll-btn[\s\S]*width:\s*calc\(100% - 76px\)/,
    );
  });
});
