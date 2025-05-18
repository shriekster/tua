export type Color =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type LoginData = {
  username: string;
  password: string;
};
