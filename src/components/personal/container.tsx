import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  align?: "top" | "middle" | "bottom" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  display?: "grid" | "flex";
  hasBackground?: boolean;
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  cols = 1,
  gap = 6,
  align = "top",
  justify = "start",
  display = "grid",
  hasBackground = false,
  className,
  children,
  ...props
}) => {
  const colMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const childWidthMap = {
    1: "w-full",
    2: "w-1/3",
    3: "w-1/4",
    4: "w-1/5",
    5: "w-1/6",
    6: "w-1/7",
  };

  const gapMap = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
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

  if (display === "grid") {
    return (
      <div
        className={cn(
          "grid px-6 py-4 rounded-2xl w-full",
          hasBackground ? "shadow bg-white" : "",
          colMap[cols],
          gapMap[gap],
          alignMap[align],
          justifyMap[justify],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap px-6 py-4 rounded-2xl",
        hasBackground ? "shadow bg-white" : "",
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <div
          className={cn(
            childWidthMap[cols],
            "flex justify-center items-center"
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
