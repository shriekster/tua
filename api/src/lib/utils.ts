import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

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
