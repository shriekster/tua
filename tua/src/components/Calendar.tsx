import { onMount } from "solid-js";
import Framework7 from "framework7/lite-bundle";
import "framework7/css/bundle";

export default function Calendar() {
  const f7 = new Framework7({
    el: "#f7",
  });

  onMount(() => {
    const calendar = f7.calendar.create({
      containerEl: "#calendar",
    });
  });

  return (
    <div id="f7">
      <div id="calendar"></div>
    </div>
  );
}
