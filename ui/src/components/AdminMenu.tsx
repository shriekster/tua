import { clientOnly } from "@solidjs/start";
import { useLocation, useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BiRegularMenuAltRight } from "solid-icons/bi";
import { BiRegularMenu } from "solid-icons/bi";
import { BsCalendar3 } from "solid-icons/bs";
import { FaSolidUserAstronaut } from "solid-icons/fa";
import { TiLocation } from "solid-icons/ti";
import { TbSettings } from "solid-icons/tb";
import { TbLogout } from "solid-icons/tb";
import { FaSolidStarOfLife } from "solid-icons/fa";
import TuaIcon from "./TuaIcon";
import clsx from "clsx";
export default function AdminMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname;

  const [isMenuOpen, setMenuOpen] = createSignal(false);

  const handleOpenChange = (isOpen: boolean) => {
    setMenuOpen(isOpen);
  };

  function MenuIcon(props: { isMenuOpen: boolean }) {
    console.debug({ isMenuOpen: props.isMenuOpen });
    if (props.isMenuOpen) {
      return <BiRegularMenu size={24} />;
    }

    return <BiRegularMenuAltRight size={24} />;
  }

  return (
    <nav class="flex justify-between p-2 bg-zinc-900 !w-[100%]">
      <TuaIcon />
      <span class="font-sans font-bold text-xl">TUA</span>
      <DropdownMenu onOpenChange={handleOpenChange} placement="bottom-end">
        <DropdownMenuTrigger
          as={(props: DropdownMenuSubTriggerProps) => (
            <Button
              {...props}
              size="icon"
              variant="ghost"
              class="flex relative"
            >
              <BiRegularMenu
                size={24}
                class={clsx(
                  "absolute",
                  "transition-opacity",
                  "duration-300",
                  `${isMenuOpen() ? "opacity-100" : "opacity-0"}`
                )}
              />
              <BiRegularMenuAltRight
                size={24}
                class={clsx(
                  "absolute",
                  "transition-opacity",
                  "duration-300",
                  `${isMenuOpen() ? "opacity-0" : "opacity-100"}`
                )}
              />
            </Button>
          )}
        />
        <DropdownMenuContent class="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                navigate("/admin");
              }}
              class="relative"
            >
              <BsCalendar3 class="mr-2" size={20} />
              <span>Calendar</span>
              {pathName === "/admin" && (
                <FaSolidStarOfLife size={16} class="absolute right-1" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate("/admin/profile");
              }}
              class="relative"
            >
              <FaSolidUserAstronaut class="mr-2" size={20} />
              <span>Profil</span>
              {pathName === "/admin/profile" && (
                <FaSolidStarOfLife size={16} class="absolute right-1" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate("/admin/locations");
              }}
              class="relative"
            >
              <TiLocation class="mr-2" size={20} />
              <span>Locații</span>
              {pathName === "/admin/locations" && (
                <FaSolidStarOfLife size={16} class="absolute right-1" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate("/admin/settings");
              }}
              class="relative"
            >
              <TbSettings class="mr-2" size={20} />
              <span>Setări</span>
              {pathName === "/admin/settings" && (
                <FaSolidStarOfLife size={16} class="absolute right-1" />
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <TbLogout class="mr-2" size={20} />
            <span>Deconectare</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
