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
    | "thin";
  italic?: boolean;
  isTitle?: boolean;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  size = "base",
  color = "default",
  lineHeight,
  variant,
  italic = false,
  isTitle = false,
  className,
  children,
  ...props
}) => {
  const sizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-sm sm:text-base",
    lg: "text-sm sm:text-base md:text-lg",
    xl: "text-base sm:text-lg md:text-xl",
    "2xl": "text-lg sm:text-xl md:text-2xl",
    "3xl": "text-xl sm:text-2xl md:text-3xl",
    "4xl": "text-2xl sm:text-3xl md:text-4xl",
    "5xl": "text-3xl sm:text-4xl md:text-5xl",
    "6xl": "text-3xl sm:text-5xl md:text-6xl",
    "7xl": "text-4xl sm:text-6xl md:text-7xl",
    "8xl": "text-5xl sm:text-7xl md:text-8xl",
    "9xl": "text-6xl sm:text-8xl md:text-9xl",
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
  };

  if (isTitle) {
    return (
      <p
        className={cn(
          "text-5xl text-slate-950 font-semibold",
          lineHeight && lineHeightMap[lineHeight],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }

  return (
    <p
      className={cn(
        sizeMap[size],
        colorMap[color],
        lineHeight && lineHeightMap[lineHeight],
        variant && variantMap[variant],
        italic && "italic",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
