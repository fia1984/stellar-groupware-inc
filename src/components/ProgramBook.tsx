import { useEffect, useRef, useState, type MouseEvent } from "react";

type ProgramBookProps = {
  title: string;
  href: string;
  actionLabel?: string;
  actionClassName?: string;
  openInNewTab?: boolean;
  className?: string;
};

export function bookCoverLines(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) {
    return [title.trim()];
  }
  if (words.length === 2) {
    return words;
  }
  const splitAt = Math.ceil(words.length / 2);
  return [words.slice(0, splitAt).join(" "), words.slice(splitAt).join(" ")];
}

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function ProgramBook({
  title,
  href,
  actionLabel = "Enroll Now →",
  actionClassName = "enroll-btn",
  openInNewTab = true,
  className,
}: ProgramBookProps) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<number | undefined>(undefined);
  const coverLines = bookCoverLines(title);

  useEffect(() => {
    return () => {
      if (openTimer.current) {
        window.clearTimeout(openTimer.current);
      }
    };
  }, []);

  const goToHref = () => {
    if (openInNewTab) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.assign(href);
  };

  const openBookThenGo = (event: MouseEvent<HTMLAnchorElement>) => {
    if (open) {
      return;
    }

    setOpen(true);
    if (prefersReducedMotion()) {
      return;
    }

    event.preventDefault();
    openTimer.current = window.setTimeout(goToHref, 650) as unknown as number;
  };

  return (
    <div className={["program-book-block", className].filter(Boolean).join(" ")}>
      <div className={`program-book${open ? " is-open" : ""}`} aria-hidden="true">
        <div className="program-book-cover">
          <span className="program-book-mark">S</span>
          {coverLines.map((line) => (
            <strong key={line}>{line}</strong>
          ))}
        </div>
      </div>
      <a
        href={href}
        className={actionClassName}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        aria-expanded={open}
        onClick={openBookThenGo}
      >
        {actionLabel}
      </a>
    </div>
  );
}

export default ProgramBook;
