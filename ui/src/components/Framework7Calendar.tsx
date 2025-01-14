import {
  createSignal,
  createEffect,
  createComputed,
  onMount,
  createMemo,
  onCleanup,
} from "solid-js";
import Framework7 from "framework7/lite";
import Calendar, {
  Calendar as CalendarNamespace,
} from "framework7/components/calendar";
import { type EventSourceController, EventSourcePlus } from "event-source-plus";
import type { Events } from "@/types/calendar";
import { Button } from "@/components/ui/button";
import CustomLoader from "@/components/CustomLoader";
import { delay } from "@/libs/utils";
import { monthNames } from "@/constants/calendar";

import "framework7/css/bundle";

Framework7.use([Calendar]);

export default function Framework7Calendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = createSignal([today]);
  const [currentMonth, setCurrentMonth] = createSignal(today.getMonth());
  const [currentYear, setCurrentYear] = createSignal(today.getFullYear());
  const [events, setEvents] = createSignal([] as Events);
  const [loading, setLoading] = createSignal(true);

  const framework7App = new Framework7({
    el: "#framework7-app",
    darkMode: true,
    theme: "md",
    colors: {
      primary: "#030712",
    },
  });

  let controller: EventSourceController;
  let calendar: CalendarNamespace.Calendar;

  const handleMonthYearChangeStart = (calendar: CalendarNamespace.Calendar) => {
    setCurrentYear(calendar.currentYear);
    setCurrentMonth(calendar.currentMonth);
  };

  const handleCalendarValueChange = (
    _calendar: CalendarNamespace.Calendar,
    value: unknown
  ) => {
    setCurrentDate(value as Date[]);
  };

  const handleNextMonth = () => {
    calendar.nextMonth(250);
  };

  const handlePreviousMonth = () => {
    calendar.prevMonth(250);
  };

  const handleClickTodayButton = () => {
    const month = today.getMonth();
    const year = today.getFullYear();

    calendar.setValue([today]);

    const shouldCalendarTransition =
      year !== calendar.currentYear || month !== calendar.currentMonth;

    if (shouldCalendarTransition) {
      calendar.setYearMonth(year, month, 250);
    }
  };

  onMount(() => {
    calendar = framework7App.calendar.create({
      containerEl: "#calendar",
      locale: "ro-RO",
      cssClass: "max-w-[340px]",
      value: currentDate(),
      toolbar: false,
      weekHeader: true,
      // minDate: today,
      events: events(),
      on: {
        monthYearChangeStart: handleMonthYearChangeStart,
        change: handleCalendarValueChange,
      },
    });
  });

  // @TODO: properly parse received data via SSE
  // @TODO: properly set events state after parsing and validating data
  onMount(async () => {
    await delay(500);

    const eventSource = new EventSourcePlus("/api/admin/events", {
      // credentials: true,
      headers: {
        "X-Origin": window.location.origin,
      },
      credentials: "same-origin",
    });
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    controller = eventSource.listen({
      onResponse(context) {
        console.debug({ context });
        setLoading(false);
      },
      onMessage(data) {
        console.debug(data);
      },
    });

    // eventSource.onopen = (e) => {
    //   console.debug("OPEN", e.timeStamp, e.type);
    //   setLoading(false);
    // };

    // eventSource.addEventListener("counter", (e) => {
    //   console.debug(e.data);
    // });

    // eventSource.onmessage = (event: MessageEvent) => {
    //   const data = Number(event.data);
    //   const newDay = day + data;
    //   const date = new Date(year, month, newDay);
    //   console.debug({
    //     year,
    //     month,
    //     day,
    //     newDay,
    //     date: date.toLocaleDateString("ro"),
    //   });

    //   // console.debug(event.data);
    //   setEvents((prevEvents) => [
    //     ...prevEvents,
    //     {
    //       date,
    //       hours: 12,
    //       minutes: 30,
    //       title: "Meeting with Vladimir",
    //       color: "#dc2626",
    //     },
    //   ]);
    // };
  });

  onCleanup(() => {
    controller.abort();
  });

  onCleanup(() => {
    calendar.destroy();
  });

  createEffect(() => {
    const newEvents = events();
    // console.debug({ newEvents });
    if (calendar) {
      calendar.params.events = [...newEvents];

      calendar.update();
    }
  });

  return (
    <div
      id="container"
      class="flex items-center justify-center relative font-sans bg-gray-950"
    >
      {loading() && <CustomLoader />}
      <div
        id="framework7-app"
        class={`flex flex-col items-center select-none ${
          loading()
            ? `opacity-25 pointer-events-none`
            : `opacity-100 pointer-events-auto`
        }`}
      >
        <div class="toolbar calendar-custom-toolbar min-w-[320px] max-w-[340px] shrink-0">
          <div class="toolbar-inner">
            <div class="left">
              <a class="link icon-only" onClick={handlePreviousMonth}>
                <i class="icon icon-back"></i>
              </a>
            </div>
            <div class="center">
              {`${monthNames[currentMonth()]} ${currentYear()}`}
            </div>
            <div class="right">
              <a class="link icon-only" onClick={handleNextMonth}>
                <i class="icon icon-forward"></i>
              </a>
            </div>
          </div>
        </div>
        <div id="calendar" class="max-w-[340px] w-[100%] shrink-0"></div>
        <div class="max-w-[340px] w-[100%]">
          <Button
            class="no-ripple mt-[16px] font-medium"
            variant="outline"
            onClick={handleClickTodayButton}
          >
            Astăzi
          </Button>
        </div>
      </div>
    </div>
  );
}
