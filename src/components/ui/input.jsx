import * as React from "react";
import { cn } from "lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-700 bg-[#121212] px-3 py-2 text-sm text-white placeholder:text-gray-400 " +
        "focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-700",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
