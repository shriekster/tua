import { createSignal, onMount } from "solid-js";
import Framework7 from "framework7/lite";
import Calendar, {
  Calendar as CalendarNamespace,
} from "framework7/components/calendar";

import "framework7/css/bundle";

Framework7.use([Calendar]);

const monthNames = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
];

export default function Framework7Calendar() {
  let today = new Date();

  const [currentDate, setCurrentDate] = createSignal([today]);
  const [currentMonth, setCurrentMonth] = createSignal(today.getMonth());
  const [currentYear, setCurrentYear] = createSignal(today.getFullYear());

  const framework7App = new Framework7({
    el: "#framework7-app",
    darkMode: true,
  });

  let calendar: CalendarNamespace.Calendar;

  const handleNextMonth = () => {
    calendar.nextMonth(250);
  };

  const handlePreviousMonth = () => {
    calendar.prevMonth(250);
  };

  onMount(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    calendar = framework7App.calendar.create({
      containerEl: "#calendar",
      locale: "ro-RO",
      cssClass: "dark max-w-[340px]",
      value: currentDate(),
      toolbar: false,
      // events: [{ date: new Date() }],
      events: [
        {
          date: new Date(year, month, day),
          hours: 12,
          minutes: 30,
          title: "Meeting with Vladimir",
          color: "#2196f3",
        },
        {
          date: new Date(year, month, day),
          hours: 18,
          minutes: 0,
          title: "Shopping",
          color: "#4caf50",
        },
        {
          date: new Date(year, month, day),
          hours: 21,
          minutes: 0,
          title: "Gym",
          color: "#e91e63",
        },
        {
          date: new Date(year, month, day + 2),
          hours: 16,
          minutes: 0,
          title: "Pay loan",
          color: "#2196f3",
        },
        {
          date: new Date(year, month, day + 2),
          hours: 21,
          minutes: 0,
          title: "Gym",
          color: "#ff9800",
        },
      ],
      on: {
        monthYearChangeStart: function (_calendar, year, month) {
          setCurrentYear(year);
          setCurrentMonth(month);
        },
        dayClick(_calendar, _dayElement, year, month, day) {
          setCurrentYear(year);
          setCurrentMonth(month);
          setCurrentDate([new Date(year, month, day)]);
        },
      },
    });
  });

  return (
    <div id="framework7-app" class="flex flex-col items-center">
      <div class="toolbar calendar-custom-toolbar no-shadow min-w-[320px] max-w-[340px] shrink-0">
        <div class="toolbar-inner">
          <div class="left">
            <a class="link icon-only" onClick={handlePreviousMonth}>
              <i class="icon icon-back"></i>
            </a>
          </div>
          <div class="center">
            {`${monthNames[currentMonth()]}, ${currentYear()}`}
          </div>
          <div class="right">
            <a class="link icon-only" onClick={handleNextMonth}>
              <i class="icon icon-forward"></i>
            </a>
          </div>
        </div>
      </div>
      <div id="calendar" class="min-w-[320px] max-w-[340px] shrink-0"></div>
    </div>
  );
}
