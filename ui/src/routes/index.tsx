import { clientOnly } from "@solidjs/start";
import UserMenu from "@/components/UserMenu";

import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    // <main class="dark h-[340px]">
    <>
      <UserMenu />
      <Calendar />
    </>
    // </main>
  );
}
