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
          console.log(entry.intersectionRatio);

          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            setCurrentHeadingID((entry.target as HTMLHeadElement).dataset.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -70% 0%",
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
    window.scrollTo({
      top: heading.getBoundingClientRect().top + window.scrollY - 60,
      behavior: "smooth",
    });
  };

  return (
    <div className="text-sm xl:block order-1 lg:order-2">
      <div className="sticky top-16 -mt-10 w-72 overflow-y-auto pt-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="font-medium text-lg">Tabla de contenidos</p>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="m-0 list-none p-1" ref={listWrapperRef}>
                {headings.map((heading) => (
                  <li
                    className={`pt-1.5 ${
                      Number(heading.tagName.match(/(\d+)/)?.[0] || "1") > 2
                        ? "ml-10"
                        : ""
                    }`}
                    key={heading.dataset.id}
                  >
                    <a
                      data-id={heading.dataset.id}
                      onClick={() => goToSection(heading)}
                      className={`inline-flex no-underline text-sm text-gray-400 cursor-pointer ${
                        currentHeadingID === heading.dataset.id
                          ? "text-white"
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
      </div>
    </div>
  );
};
