import type { Color } from "@/types/ui";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";

export const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve();
    }, milliseconds);
  });

export const encodeHex = (value: string) => {
  const encoded = encodeHexLowerCase(sha256(new TextEncoder().encode(value)));
  return encoded;
};

export const getColorClassMap = (htmlElement: string) => ({
  neutral: `${htmlElement}-neutral`,
  primary: `${htmlElement}-primary`,
  secondary: `${htmlElement}-secondary`,
  accent: `${htmlElement}-accent`,
  info: `${htmlElement}-info`,
  success: `${htmlElement}-success`,
  warning: `${htmlElement}-warning`,
  error: `${htmlElement}-error`,
});

export const getSizeClassMap = (htmlElement: string) => ({
  xs: `${htmlElement}-xs`,
  sm: `${htmlElement}-sm`,
  md: `${htmlElement}-md`,
  lg: `${htmlElement}-lg`,
  xl: `${htmlElement}-xl`,
});

export const getStrokeColor = (color: Color) => `stroke-${color}`;
