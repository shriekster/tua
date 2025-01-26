import { clientOnly } from "@solidjs/start";
import UserMenu from "@/components/UserMenu";

import Calendar from "@/components/Calendar";
import { subscribe } from "@/services/events";
import { onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";

export default function Home() {
  let eventSource: EventSource;
  let controller: AbortController;

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      controller?.abort();
      eventSource?.close();
    } else {
      ({ eventSource, controller } = subscribe("/api/events"));
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

  const handleServerUsersEvent = (e: MessageEvent) => {
    console.log("USERS", e.data);
  };

  onMount(() => {
    if (!isServer) {
      ({ eventSource, controller } = subscribe("/api/events"));
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
    // <main class="dark h-[340px]">
    <>
      <UserMenu />
      <Calendar />
    </>
    // </main>
  );
}
