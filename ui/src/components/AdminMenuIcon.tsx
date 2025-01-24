import { BiRegularMenuAltRight } from "solid-icons/bi";
import { BiRegularMenu } from "solid-icons/bi";
import { cn } from "@/libs/cn";

export default function MenuIcon(props: { isMenuOpen: boolean }) {
  return (
    <>
      <BiRegularMenu
        size={24}
        class={cn(
          "absolute transition-opacity duration-300",
          `${props.isMenuOpen ? "opacity-100" : "opacity-0"}`
        )}
      />
      <BiRegularMenuAltRight
        size={24}
        class={cn(
          "absolute transition-opacity duration-300",
          `${props.isMenuOpen ? "opacity-0" : "opacity-100"}`
        )}
      />
    </>
  );
}
