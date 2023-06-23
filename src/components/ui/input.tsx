import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border bg-transparent border-[#e5e7eb] placeholder:text-[#84858a] py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-muted text-dark",
          "focus:ring-forms dark:focus:ring-light",
          "focus:ring-offset-transparent dark:focus:ring-offset-app-dark",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
