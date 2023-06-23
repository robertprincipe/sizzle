import * as TogglePrimitive from "@radix-ui/react-toggle";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const toggleVariants = cva(
  "inline-flex items-center bg-light justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-light dark:hover:bg-dark dark:data-[state=on]:bg-dark focus:outline-none dark:text-light focus:ring-2 focus:ring-app-dark focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset--dark hover:bg-light  dark:hover:text-light dark:data-[state=on]:text-light",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "bg-transparent border border-dark hover:bg-light",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
