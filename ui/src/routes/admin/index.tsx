import { clientOnly } from "@solidjs/start";
import Menu from "@/components/Menu";

const Framework7Calendar = clientOnly(
  () => import("@/components/Framework7Calendar")
);

export default function Calendar() {
  return (
    <main class="dark h-[340px]">
      <Menu />
      <Framework7Calendar />
    </main>
  );
}
