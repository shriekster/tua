import { getColorClassMap, getSizeClassMap, getStrokeColor } from "@/lib/utils";
import type { Color, Size } from "@/types/ui";
import clsx from "clsx";
import { type JSX, children, createEffect } from "solid-js";

type IconButtonProps = {
  size?: Size;
  color?: Color;
  class?: string;
  tabIndex?: number;
  children: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const colorClassMap = getColorClassMap("btn");
const sizeClassMap = getSizeClassMap("btn");

const IconButton = (props: IconButtonProps) => {
  const colorClass = () => colorClassMap[props.color ?? "primary"];
  const strokeClass = () => `*:${getStrokeColor(props?.color ?? "primary")}`;
  const sizeClass = () => sizeClassMap[props.size ?? "md"];
  const buttonClass = () =>
    clsx(
      "btn",
      "btn-circle",
      "btn-icon",
      colorClass(),
      strokeClass(),
      sizeClass(),
      props.class
    );
  const tabIndex = () => props?.tabIndex ?? 0;
  const safeChildren = children(() => props.children);

  createEffect(() => console.log(colorClass(), strokeClass()));

  return (
    <button
      type="button"
      tabIndex={tabIndex()}
      class={buttonClass()}
      onMouseDown={props?.onMouseDown}
      onClick={props?.onClick}
    >
      {safeChildren()}
    </button>
  );
};

export default IconButton;
