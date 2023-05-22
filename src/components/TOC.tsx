import { useEffect, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TOSType = {
  selector: string;
};

export const TOC = ({ selector }: TOSType) => {
  const [openTOC, setOpenTOC] = useState("toc");
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
    <Accordion type="single" collapsible value={openTOC}>
      <AccordionItem value="toc">
        <AccordionTrigger
          onClick={() => setOpenTOC(openTOC === "toc" ? "" : "toc")}
        >
          <p className="font-medium text-lg">Tabla de contenidos</p>
        </AccordionTrigger>
        <AccordionContent className="overflow-hidden -mt-5">
          <ul className="m-0 list-none p-1" ref={listWrapperRef}>
            {headings.map((heading) => (
              <li
                className={`pt-1.5 ${
                  Number(heading.tagName.match(/(\d+)/)?.[0] || "1") > 2
                    ? "ml-6"
                    : ""
                }`}
                key={heading.dataset.id}
              >
                <a
                  data-id={heading.dataset.id}
                  onClick={() => goToSection(heading)}
                  className={`inline-flex no-underline text-sm text-gray-400 cursor-pointer ${
                    currentHeadingID === heading.dataset.id
                      ? "text-white font-semibold"
                      : "hover:text-gray-200"
                  }`}
                >
                  {heading.innerHTML}
                </a>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
