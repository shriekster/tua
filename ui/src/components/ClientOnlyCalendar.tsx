import { createSignal, createEffect, For, onMount } from "solid-js";
import { format, addMonths, addYears, getYear } from "date-fns";
import { IonButtons, IonDatetime, setupIonicSolid } from "@ionic-solidjs/core";
import { Button } from "@/components/ui/button";
import { getAllowedYearValues, isCalendarMonthDisplayed } from "@/libs/utils";
import type {
  DatetimeChangeEventDetail,
  DatetimeHighlight,
  IonDatetimeCustomEvent,
} from "@ionic/core";
import "./css/ionic-css";

setupIonicSolid({
  mode: "md",
});

const SwipeableCalendar = () => {
  const today = new Date().toISOString();
  const yearValues = getAllowedYearValues(today);
  const maxAllowedYear = Math.max(...yearValues);
  const _workaroundFutureDate = new Date(
    `${maxAllowedYear + 1}-01-01`
  ).toISOString();

  const [events, setEvents] = createSignal<DatetimeHighlight[]>([]);
  const [selectedDate, setSelectedDate] = createSignal<string | undefined>();

  let calendarRef: HTMLIonDatetimeElement;

  const handleIonChange = (
    e: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => {
    setSelectedDate(e.target.value as string);
  };

  const handleClickTodayButton = () => {
    setSelectedDate(today);
    calendarRef.confirm(false);

    // This is a workaround for a bug in the IonDateTime component:
    // the `reset` method does not work correctly when the current displayed month is after the current (present) month
    if (isCalendarMonthDisplayed(calendarRef, selectedDate())) {
      calendarRef.reset(_workaroundFutureDate).then(() => {
        calendarRef.reset(today).then(() => {
          console.debug("RESET");
        });
      });
    }
  };

  // @TODO: set events after receiving data from the SSE endpoint
  onMount(() => {
    setEvents([
      { date: "2025-01-18", textColor: "#800080", backgroundColor: "#ffc000" },
      { date: "2025-01-19", textColor: "#09721b", backgroundColor: "#c8e500" },
      { date: "2025-01-20", textColor: "#09721b", backgroundColor: "#c8e500" },
    ]);
  });

  onMount(() => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);

      const monthYearPickerButton = calendarRef.shadowRoot?.querySelector(
        ".calendar-month-year-toggle"
      );
      monthYearPickerButton?.setAttribute("inert", "");

      const monthYearPickerArrow =
        calendarRef?.shadowRoot?.querySelector("ion-icon");
      if (monthYearPickerArrow && monthYearPickerArrow?.style) {
        monthYearPickerArrow.style.display = "none";
      }
    });
  });

  return (
    <div class="w-full max-w-xl mx-auto">
      <IonDatetime
        // class="bg-zinc-950 font-sans"
        // color="secondary"
        size="cover"
        multiple={false}
        preferWheel={false}
        presentation="date"
        locale="ro-RO"
        firstDayOfWeek={1}
        highlightedDates={events()}
        value={selectedDate()}
        yearValues={yearValues}
        on:ionChange={handleIonChange}
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
