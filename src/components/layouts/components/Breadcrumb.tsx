import { capitalize } from "@/lib/strings";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const steps = location.pathname.split("/");
  return (
    <ol className="flex items-center min-w-0 ml-3 whitespace-nowrap">
      {steps.map((item, index) => (
        <Link
          key={index}
          to={`${steps.slice(0, index + 1).join("/")}`}
          className={`text-sm items-center text-dark flex truncate dark:text-muted ${
            steps.length - 1 === index ? "font-semibold" : ""
          }`}
        >
          {capitalize(item)}
          {index > 0 && steps.length - 1 !== index && (
            <ChevronRight className="h-4 mt-1" />
          )}
        </Link>
      ))}
    </ol>
  );
};

export default Breadcrumb;
