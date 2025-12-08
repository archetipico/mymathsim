import type { HTMLAttributes } from "react";

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number;
  span?: number;
  align?: "top" | "middle" | "bottom" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  children: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({
  gap = 6,
  span = 1,
  align = "middle",
  justify = "start",
  wrap = false,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row
        gap-${gap}
        gap-${span}
        items-${align}
        justify-${justify}
        ${wrap && " flex-wrap"}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
