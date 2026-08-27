import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-md bg-surface px-3.5 py-3 text-base text-ink shadow-[0_0_0_1px_var(--color-line)] placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
