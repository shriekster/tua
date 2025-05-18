import { getColorClassMap, getSizeClassMap } from "@/lib/utils";
import type { Color, Size } from "@/types/ui";
import clsx from "clsx";
import { type JSX } from "solid-js";

type ButtonProps = {
  size?: Size;
  color?: Color;
  variant?: "outline";
  class?: string;
  fullWidth?: boolean;
  label: string;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const colorClassMap = getColorClassMap("btn");
const sizeClassMap = getSizeClassMap("btn");

const Button = (props: ButtonProps) => {
  const colorClass = () => colorClassMap[props.color ?? "primary"];
  const sizeClass = () => sizeClassMap[props.size ?? "md"];
  const variantClass = () => (props?.variant ? "btn-outline" : "");
  const buttonClass = () =>
    clsx(
      "btn",
      colorClass(),
      sizeClass(),
      variantClass(),
      props?.fullWidth && "w-full",
      props.class
    );
  const type = () => props.type ?? "button";

  return (
    <button type={type()} class={buttonClass()}>
      {props.label}
    </button>
  );
};

export default Button;
