import { createSignal, createEffect, For, onMount } from "solid-js";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

// Mock events data (replace with your actual events data)
const events = [
  { date: "2024-03-15", title: "Meeting" },
  { date: "2024-03-20", title: "Conference" },
  { date: "2024-04-05", title: "Workshop" },
];

const SwipeableCalendar = () => {
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [selectedDate, setSelectedDate] = createSignal(new Date());
  const [calendarData, setCalendarData] = createSignal<Date[][]>([]);
  const [carouselApi, setCarouselApi] = createSignal<ReturnType<CarouselApi>>();

  const generateCalendarData = (date: Date) => {
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    days.forEach((day, index) => {
      if (index % 7 === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  onMount(() => {
    const api = carouselApi();
    if (api) {
      // api.on("slidesInView", logSlidesInView);
      api.on("slidesChanged", (emblaApi, event) => {
        const index = emblaApi.internalEngine().index;
        if (index.get() === 0) {
          handleSwipe("prev");
          carouselApi()?.scrollTo(1, false);
        } else if (index.get() === 2) {
          handleSwipe("next");
          carouselApi()?.scrollTo(1, false);
        }
      });
    }
  });

  createEffect(() => {
    const prevMonth = generateCalendarData(addMonths(currentDate(), -1));
    const currentMonth = generateCalendarData(currentDate());
    const nextMonth = generateCalendarData(addMonths(currentDate(), 1));
    setCalendarData([prevMonth, currentMonth, nextMonth]);
  });

  const handleSwipe = (direction: "prev" | "next") => {
    setCurrentDate((prev) => addMonths(prev, direction === "prev" ? -1 : 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    carouselApi()?.scrollTo(1, false);
  };

  const hasEvent = (date: Date) => {
    return events.some((event) => isSameDay(parseISO(event.date), date));
  };

  return (
    <div class="w-full max-w-md mx-auto">
      <Carousel
        opts={{ loop: true, startIndex: 1 }}
        class="w-full"
        setApi={setCarouselApi}
        // onSlideChange={(index) => {
        //   if (index === 0) {
        //     handleSwipe("prev");
        //     carouselApi()?.scrollTo(1, false);
        //   } else if (index === 2) {
        //     handleSwipe("next");
        //     carouselApi()?.scrollTo(1, false);
        //   }
        // }}
      >
        <CarouselContent>
          <For each={calendarData()}>
            {(monthData, monthIndex) => (
              <CarouselItem>
                <div class="p-4">
                  <h2 class="text-2xl font-bold mb-4 text-center">
                    {format(
                      addMonths(currentDate(), monthIndex() - 1),
                      "MMMM yyyy"
                    )}
                  </h2>
                  <div class="grid grid-cols-7 gap-2">
                    <For
                      each={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                    >
                      {(day) => (
                        <div class="text-center font-semibold">{day}</div>
                      )}
                    </For>
                    <For each={monthData.flat()}>
                      {(date) => (
                        <div
                          class={`text-center p-2 rounded-full cursor-pointer relative
                            ${
                              isSameMonth(
                                date,
                                addMonths(currentDate(), monthIndex() - 1)
                              )
                                ? ""
                                : "text-gray-400"
                            }
                            ${
                              isSameDay(date, selectedDate())
                                ? "bg-primary text-primary-foreground"
                                : ""
                            }
                            ${hasEvent(date) ? "font-bold" : ""}
                          `}
                          onClick={() => setSelectedDate(date)}
                        >
                          {format(date, "d")}
                          {hasEvent(date) && (
                            <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
        <CarouselPrevious onClick={() => handleSwipe("prev")} />
        <CarouselNext onClick={() => handleSwipe("next")} />
      </Carousel>
      <div class="mt-4 flex justify-center">
        <Button onClick={handleToday}>Today</Button>
      </div>
    </div>
  );
};

export default SwipeableCalendar;
