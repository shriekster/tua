import { clientOnly } from "@solidjs/start";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Framework7Calendar = clientOnly(
  () => import("@/components/Framework7Calendar")
);

export default function Home() {
  return (
    // <main class="dark h-[340px]">
    <Framework7Calendar />
    // </main>
  );
}
