import { useEffect, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TOCProps = {
  selector: string;
};

export const TOC = ({ selector }: TOCProps) => {
  const [currentHeadingID, setCurrentHeadingID] = useState<
    string | undefined
  >();
  const [headings, setHeadings] = useState<HTMLHeadElement[]>([]);

  const listWrapperRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const headingNodeList = document
      .querySelector(selector)!
      .querySelectorAll("h2,h3,h4,h5,h6") as NodeListOf<HTMLHeadElement>;

    if (headingNodeList.length) {
      const headingArray = Array.from(headingNodeList);
      headingArray.forEach((el) => {
        el.dataset.id = Math.round(Math.random() * 100000).toString();
      });
      setHeadings(headingArray);
    }
  }, [selector]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            setCurrentHeadingID((entry.target as HTMLHeadElement).dataset.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -75% 0%",
        threshold: 1,
      }
    );

    if (headings.length) {
      headings.forEach((s) => {
        observer.observe(s);
      });
    }

    return () => {
      return observer.disconnect();
    };
  }, [headings.length]);

  useEffect(() => {
    const element = listWrapperRef.current?.querySelector(
      `button[data-id="${currentHeadingID}"]`
    );

    if (currentHeadingID && element) {
      listWrapperRef.current?.scrollTo({
        top: (element as HTMLElement).offsetTop,
        behavior: "smooth",
      });
    }
  }, [currentHeadingID]);

  const goToSection = (heading: any) => {
    console.log(heading);
    window.scrollTo({
      top: heading.getBoundingClientRect().top + window.scrollY - 64,
      behavior: "smooth",
    });
  };

  return (
    <ul
      className="flex flex-col text-sm text-muted-foreground"
      ref={listWrapperRef}
    >
      {headings.map((heading) => (
        <li
          className={`${
            Number(heading.tagName.match(/(\d+)/)?.[0] || "1") > 2
              ? "ml-3 border-l-2 border-r-border px-3"
              : "py-2"
          }`}
          key={heading.dataset.id}
        >
          <a
            data-id={heading.dataset.id}
            onClick={() => goToSection(heading)}
            className={`inline-flex no-underline cursor-pointer ${
              currentHeadingID === heading.dataset.id
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {heading.innerHTML}
          </a>
        </li>
      ))}
    </ul>
  );
};
