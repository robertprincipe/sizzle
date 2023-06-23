import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-20 w-full rounded-md border border-[#e5e7eb] placeholder:text-[#84858a] py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-muted dark:text-light",
          "focus:ring-forms dark:focus:ring-light",
          "focus:ring-offset-app-light dark:focus:ring-offset-app-dark",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
