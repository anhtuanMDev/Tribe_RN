import { Alpha, alphaHexMap } from "../config/constants";

export const convertAlpha = (alpha: Alpha, color: string): string => {
  if (!color.startsWith('#')) {
    throw new Error('Color must be in hex format like #RRGGBB');
  }

  // remove existing alpha if already provided (#RRGGBBAA)
  const baseColor = color.length === 9 ? color.slice(0, 7) : color;

  return `${baseColor}${alphaHexMap[alpha]}`;
};
