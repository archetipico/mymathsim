import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number;
  span?: number;
  align?: "top" | "middle" | "bottom" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  children: React.ReactNode;
}

export const Col: React.FC<ColProps> = ({
  gap = 6,
  span = 1,
  align = "top",
  justify = "start",
  wrap = false,
  children,
  className,
  ...props
}) => {
  const gapMap: { [key: number]: string } = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
  };

  const spanMap: { [key: number]: string } = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
  };

  const alignMap = {
    top: "items-start",
    middle: "items-center",
    bottom: "items-end",
    baseline: "items-baseline",
  };

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  return (
    <div
      className={cn(
        "flex flex-col",
        gapMap[gap],
        spanMap[span],
        alignMap[align],
        justifyMap[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
