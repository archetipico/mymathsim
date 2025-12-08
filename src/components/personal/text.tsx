import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  color?: "default" | "light";
  lineHeight?: "tight" | "snug" | "normal" | "relaxed" | "loose";
  variant?:
    | "black"
    | "bold"
    | "extrabold"
    | "extralight"
    | "light"
    | "medium"
    | "mono"
    | "normal"
    | "sans"
    | "semibold"
    | "serif"
    | "thin"
    | "italic";
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  size = "base",
  color = "default",
  lineHeight,
  variant,
  className,
  children,
  ...props
}) => {
  const sizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
  };

  const colorMap = {
    default: "text-slate-950",
    light: "text-slate-400",
  };

  const lineHeightMap = {
    tight: "leading-tight",
    snug: "leading-snug",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  };

  const variantMap = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
    serif: "font-serif",
    sans: "font-sans",
    mono: "font-mono",
    italic: "italic",
  };

  return (
    <p
      className={cn(
        sizeMap[size],
        colorMap[color],
        lineHeight && lineHeightMap[lineHeight],
        variant && variantMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
