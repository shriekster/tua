import { useSearchParams, useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { FaSolidUsersBetweenLines } from "solid-icons/fa";
import { TbCloudCheck } from "solid-icons/tb";
import { TbCloudX } from "solid-icons/tb";
import { TbUserUp } from "solid-icons/tb";
import { TbUserCancel } from "solid-icons/tb";
import TuaIcon from "./TuaIcon";
import AdminMenuIcon from "@/components/AdminMenuIcon";
import type { View } from "@/types/view";
import { logout } from "@/services/admin";
import { cn } from "@/libs/cn";

export type AdminMenuProps = {
  connected: boolean;
  onlineUsers: number;
};

export default function AdminMenu(props: AdminMenuProps) {
  const [isMenuOpen, setMenuOpen] = createSignal(false);
  const [searchParams, setSearchParams] = useSearchParams<View>();
  const navigate = useNavigate();

  const handleOpenChange = (isOpen: boolean) => {
    setMenuOpen(isOpen);
  };

  // TODO: finish
  const handleLogout = async () => {
    const isUnauthenticated = await logout();

    if (isUnauthenticated) {
      console.log("Bye 👋");
      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  return (
    <nav class="flex flex-col justify-between p-2 bg-zinc-900 !w-[100%]">
      <div class="flex justify-between p-2 !w-[100%]">
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
                {(!!searchParams.view === false ||
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
            <DropdownMenuItem onClick={handleLogout} class="text-red-500">
              <TbLogout class="mr-2" size={20} />
              <span>Deconectare</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="flex justify-between p-2 f border-t-2">
        <div
          class={cn(
            "font-sans font-bold text-[16px] flex items-center justify-center gap-1",
            props.onlineUsers > 0 ? "text-green-700" : "text-red-700"
          )}
        >
          {props.onlineUsers > 0 ? (
            <TbUserUp size={20} class="text-green-700" />
          ) : (
            <TbUserCancel size={20} class="text-red-700" />
          )}
          <span>{props.onlineUsers}</span>
        </div>
        {props.connected ? (
          <TbCloudCheck size={20} class="text-green-700" />
        ) : (
          <TbCloudX size={20} class="text-red-700" />
        )}
      </div>
    </nav>
  );
}
