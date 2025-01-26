import { lazy, Switch, Match, onMount, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";
import { createStore } from "solid-js/store";
import { useSearchParams } from "@solidjs/router";
import AdminMenu from "@/components/AdminMenu";
import Calendar from "@/components/Calendar";
import type { View } from "@/types/view";
import { subscribe } from "@/services/events";

const Profile = lazy(() => import("@/components/Profile"));
const Settings = lazy(() => import("@/components/Settings"));
const Locations = lazy(() => import("@/components/Locations"));

type AdminStore = {
  onlineUsers: number;
};

export default function Admin() {
  const [searchParams] = useSearchParams<View>();
  const [store, setStore] = createStore<AdminStore>({ onlineUsers: 0 });

  let eventSource: EventSource;
  let controller: AbortController;

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      controller?.abort();
      eventSource?.close();
    } else {
      ({ eventSource, controller } = subscribe("/api/admin/events"));
      eventSource.addEventListener(
        "message",
        (e: MessageEvent) => {
          console.log({ message: e.data, e });
        },
        {
          signal: controller.signal,
        }
      );
    }
    console.log({ visibility: document.visibilityState });
  };

  // TODO: validate SSE data
  const handleServerUsersEvent = (e: MessageEvent) => {
    const { onlineUsers } = JSON.parse(e.data);
    setStore({
      ...store,
      onlineUsers: Number(onlineUsers),
    });
  };

  onMount(() => {
    if (!isServer) {
      ({ eventSource, controller } = subscribe("/api/admin/events"));
      eventSource.addEventListener("open", (e) => {
        console.log("OPEN", e);
      });
      eventSource.addEventListener(
        "counter",
        (e: MessageEvent) => {
          console.log({ message: e.data, e });
        },
        {
          signal: controller.signal,
        }
      );
      eventSource.addEventListener("users", handleServerUsersEvent, {
        signal: controller.signal,
      });
      eventSource.addEventListener("error", (e) => {
        console.error("Error", e);
      });

      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
  });

  onCleanup(() => {
    if (!isServer) {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      controller?.abort();
      eventSource?.close();
    }
  });

  return (
    <main class="dark">
      <AdminMenu onlineUsers={store.onlineUsers} />

      <Switch fallback={<div>Not Found</div>}>
        {/* Default */}
        <Match
          when={
            !!searchParams.view === false || searchParams.view === "calendar"
          }
        >
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
      </Switch>
    </main>
  );
}
