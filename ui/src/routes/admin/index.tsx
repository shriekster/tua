import { lazy, Switch, Match, onMount } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import AdminMenu from "@/components/AdminMenu";
import Calendar from "@/components/Calendar";
import type { View } from "@/types/view";

const Profile = lazy(() => import("@/components/Profile"));
const Settings = lazy(() => import("@/components/Settings"));
const Locations = lazy(() => import("@/components/Locations"));

export default function Admin() {
  const [searchParams, setSearchParams] = useSearchParams<View>();

  // onMount(() => {
  //   if (!searchParams.view) {
  //     setSearchParams({ view: "calendar" });
  //   }
  // });

  return (
    <main class="dark">
      <AdminMenu />

      <Switch fallback={<div>Not Found</div>}>
        <Match when={searchParams.view === "calendar"}>
          <Calendar />
        </Match>
        <Match when={searchParams.view === "profile"}>
          <Profile />
        </Match>
        <Match when={searchParams.view === "locations"}>
          <Locations />
        </Match>
        <Match when={searchParams.view === "settings"}>
          <Settings />
        </Match>
        {/* Default */}
        <Match when={searchParams.view == undefined}>
          <Calendar />
        </Match>
      </Switch>
    </main>
  );
}
