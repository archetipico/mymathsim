export const round = (val: string | number) => {
  return Number(Number(val).toFixed(2)).toString();
};

export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);
