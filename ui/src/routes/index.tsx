import { clientOnly } from "@solidjs/start";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserMenu from "@/components/UserMenu";
// const Framework7Calendar = clientOnly(
//   () => import("@/components/Framework7Calendar")
// );

export default function Home() {
  return (
    // <main class="dark h-[340px]">
    // <Framework7Calendar />
    <UserMenu />
    // </main>
  );
}
