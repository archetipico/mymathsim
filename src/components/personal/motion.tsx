import {
  motion,
  type TargetAndTransition,
  type Transition,
  type VariantLabels,
} from "framer-motion";
import React from "react";

type MotionProps<T extends React.ElementType> = {
  as: T;
  initial?: boolean | TargetAndTransition | VariantLabels | undefined;
  animate?: boolean | TargetAndTransition | VariantLabels | undefined;
  transition?: Transition<any> | undefined;
} & React.ComponentProps<T>;

export function Motion<T extends React.ElementType>({
  as,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 1 },
  ...props
}: MotionProps<T>) {
  const Component = motion(as as any);

  return (
    <Component
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    />
  );
}
