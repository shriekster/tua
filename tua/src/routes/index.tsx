import { clientOnly } from "@solidjs/start";

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
