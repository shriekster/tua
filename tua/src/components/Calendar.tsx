import { onMount } from "solid-js";
import Framework7 from "framework7/lite";
import F7Calendar from "framework7/components/calendar";
import "framework7/css/bundle";

Framework7.use([F7Calendar]);

export default function Calendar() {
  const f7 = new Framework7({
    el: "#f7",
  });

  onMount(() => {
    const calendar = f7.calendar.create({
      containerEl: "#calendar",
      locale: "ro-RO",
      // cssClass: "dark",
    });
  });

  return (
    <div id="f7">
      <div id="calendar"></div>
    </div>
  );
}
