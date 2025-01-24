import { useSearchParams } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";
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
import { BsCalendar3 } from "solid-icons/bs";
import { FaSolidUserAstronaut } from "solid-icons/fa";
import { TiLocation } from "solid-icons/ti";
import { TbSettings } from "solid-icons/tb";
import { TbLogout } from "solid-icons/tb";
import { FaSolidStarOfLife } from "solid-icons/fa";
import TuaIcon from "./TuaIcon";
import clsx from "clsx";
import AdminMenuIcon from "@/components/AdminMenuIcon";
import type { View } from "@/types/view";

export default function AdminMenu() {
  const [isMenuOpen, setMenuOpen] = createSignal(false);
  const [searchParams, setSearchParams] = useSearchParams<View>();

  const handleOpenChange = (isOpen: boolean) => {
    setMenuOpen(isOpen);
  };

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
              <AdminMenuIcon isMenuOpen={isMenuOpen()} />
            </Button>
          )}
        />
        <DropdownMenuContent class="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setSearchParams({ view: "calendar" });
              }}
              class="relative"
            >
              <BsCalendar3 class="mr-2" size={20} />
              <span>Calendar</span>
              {(searchParams.view == undefined ||
                searchParams.view === "calendar") && (
                <FaSolidStarOfLife size={16} class="absolute right-1" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSearchParams({ view: "profile" });
              }}
              class="relative"
            >
              <FaSolidUserAstronaut class="mr-2" size={20} />
              <span>Profil</span>
              {searchParams.view === "profile" && (
                <FaSolidStarOfLife size={16} class="absolute right-1" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSearchParams({ view: "locations" });
              }}
              class="relative"
            >
              <TiLocation class="mr-2" size={20} />
              <span>Locații</span>
              {searchParams.view === "locations" && (
                <FaSolidStarOfLife size={16} class="absolute right-1" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSearchParams({ view: "settings" });
              }}
              class="relative"
            >
              <TbSettings class="mr-2" size={20} />
              <span>Setări</span>
              {searchParams.view === "settings" && (
                <FaSolidStarOfLife size={16} class="absolute right-1" />
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-red-500">
            <TbLogout class="mr-2" size={20} />
            <span>Deconectare</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
