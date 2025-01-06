import { createSignal, createEffect, onMount } from "solid-js";
import Framework7 from "framework7/lite";
import Calendar, {
  Calendar as CalendarNamespace,
} from "framework7/components/calendar";
import { Button } from "@/components/ui/button";
import { monthNames } from "@/constants/calendar";

import "framework7/css/bundle";

Framework7.use([Calendar]);

export default function Framework7Calendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = createSignal([today]);
  const [currentMonth, setCurrentMonth] = createSignal(today.getMonth());
  const [currentYear, setCurrentYear] = createSignal(today.getFullYear());

  const framework7App = new Framework7({
    el: "#framework7-app",
    darkMode: true,
    theme: "md",
  });

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
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    calendar = framework7App.calendar.create({
      containerEl: "#calendar",
      locale: "ro-RO",
      cssClass: "dark max-w-[340px]",
      value: currentDate(),
      toolbar: false,
      weekHeader: true,
      // minDate: today,
      events: [
        {
          date: new Date(year, month, day),
          hours: 12,
          minutes: 30,
          title: "Meeting with Vladimir",
          color: "#dc2626",
        },
        // {
        //   date: new Date(year, month, day),
        //   hours: 18,
        //   minutes: 0,
        //   title: "Shopping",
        //   color: "#4caf50",
        // },
        // {
        //   date: new Date(year, month, day),
        //   hours: 21,
        //   minutes: 0,
        //   title: "Gym",
        //   color: "#e91e63",
        // },
        {
          date: new Date(year, month, day + 1),
          hours: 16,
          minutes: 0,
          title: "Pay loan",
          color: "#16a34a",
        },
        // {
        //   date: new Date(year, month, day + 2),
        //   hours: 21,
        //   minutes: 0,
        //   title: "Gym",
        //   color: "#ff9800",
        // },
      ],
      on: {
        monthYearChangeStart: handleMonthYearChangeStart,
        change: handleCalendarValueChange,
      },
    });
  });

  onMount(() => {
    const eventSource = new EventSource("http://localhost:3000/api/events");

    eventSource.onmessage = (event: MessageEvent) => {
      console.debug(event.data);
    };
  });

  return (
    <div id="framework7-app" class="flex flex-col items-center select-none">
      <div class="toolbar calendar-custom-toolbar no-shadow min-w-[320px] max-w-[340px] shrink-0">
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
          class="no-ripple mt-[16px]"
          variant="outline"
          onClick={handleClickTodayButton}
        >
          Astăzi
        </Button>
      </div>
    </div>
  );
}
