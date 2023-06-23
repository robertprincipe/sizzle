import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const buttonVariants = cva(
  "active:scale-95 hover:bg-opacity-80 select-none inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:ring-offset-app-light dark:focus:ring-offset-app-dark focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary focus:ring-primary text-app-light dark:text-app-dark",
        destructive: "bg-destructive focus:ring-destructive",
        secondary: "bg-secondary focus:ring-secondary",
        warning: "bg-warning focus:ring-warning",
        success: "bg-success focus:ring-success",
        link: "bg-link focus:ring-link",
        default: "bg-default text-dark focus:ring-default",
        outline:
          "bg-transparent border border-muted dark:border-dark dark:text-light focus:ring-transparent",

        ghost:
          "bg-transparent focus:ring-transparent focus:ring-offset-app-dark dark:focus:ring-offset-app-light data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        // link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text--dark dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
// data-[state=open]:bg-app-dark dark:data-[state=open]:bg-primary
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
