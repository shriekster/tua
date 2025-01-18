import { createSignal, createEffect, For, onMount } from "solid-js";
import { format, addMonths, addYears, getYear } from "date-fns";
import {
  IonButtons,
  IonButton,
  IonDatetime,
  setupIonicSolid,
  IonApp,
} from "@ionic-solidjs/core";
import { Button } from "@/components/ui/button";
import { isDifferentMonthAndYear } from "@/libs/utils";
import type {
  DatetimeChangeEventDetail,
  DatetimeHighlight,
  IonDatetimeCustomEvent,
} from "@ionic/core";
import type { IonDateTimeWorkingParts } from "@/types/calendar";
import "./css/ionic-css";

setupIonicSolid({
  mode: "md",
});

// @TODO: establish a safe max date for resetting the calendar
const SwipeableCalendar = () => {
  const today = new Date().toISOString();
  const [events, setEvents] = createSignal<DatetimeHighlight[]>([]);
  const [selectedDate, setSelectedDate] = createSignal<string | undefined>();
  const [maxDate, setMaxDate] = createSignal(
    addYears(addMonths(today, 1), 1).toISOString()
  );

  let calendarRef: HTMLIonDatetimeElement & {
    workingParts?: IonDateTimeWorkingParts;
  };

  const handleIonChange = (
    e: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => {
    console.debug("ION CHANGE");
    const newSelectedDate = new Date(e.target.value as string).toISOString();
    setSelectedDate(newSelectedDate);
  };

  const handleClickTodayButton = () => {
    setSelectedDate(today);

    const futureDate = addYears(maxDate(), 1).toISOString();

    if (isDifferentMonthAndYear(calendarRef.workingParts, selectedDate())) {
      calendarRef.reset(futureDate).then(() => {
        calendarRef.reset(today).then(() => {
          console.debug("RESET");
        });
      });
    }
  };

  onMount(() => {
    setEvents([
      { date: "2025-01-18", textColor: "#800080", backgroundColor: "#ffc000" },
      { date: "2025-01-19", textColor: "#09721b", backgroundColor: "#c8e500" },
      { date: "2025-01-20", textColor: "#09721b", backgroundColor: "#c8e500" },
    ]);
  });

  return (
    <div class="w-full max-w-xl mx-auto">
      <IonDatetime
        // class="bg-zinc-950 font-sans"
        draggable={false}
        color="secondary"
        size="cover"
        // monthValues={[]}
        // yearValues={[]}
        // value={selectedDate()}
        // max={maxDate()}
        // yearValues={[2024, 2025]}
        multiple={false}
        on:ionChange={handleIonChange}
        preferWheel={false}
        presentation="date"
        locale="ro-RO"
        firstDayOfWeek={1}
        highlightedDates={events()}
        value={selectedDate()}
        ref={(calendarElement) => {
          calendarRef = calendarElement;
        }}
      >
        <IonButtons slot="buttons">
          <Button
            type="button"
            variant="default"
            // class="uppercase bg-zinc-700"
            class="uppercase bg-zinc-300"
            onClick={handleClickTodayButton}
          >
            Astăzi
          </Button>
        </IonButtons>
      </IonDatetime>
    </div>
  );
};

export default SwipeableCalendar;
