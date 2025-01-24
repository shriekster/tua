import { BiRegularMenuAltRight } from "solid-icons/bi";
import { BiRegularMenu } from "solid-icons/bi";
import clsx from "clsx";

export default function MenuIcon(props: { isMenuOpen: boolean }) {
  return (
    <>
      <BiRegularMenu
        size={24}
        class={clsx(
          "absolute",
          "transition-opacity",
          "duration-300",
          `${props.isMenuOpen ? "opacity-100" : "opacity-0"}`
        )}
      />
      <BiRegularMenuAltRight
        size={24}
        class={clsx(
          "absolute",
          "transition-opacity",
          "duration-300",
          `${props.isMenuOpen ? "opacity-0" : "opacity-100"}`
        )}
      />
    </>
  );
}
