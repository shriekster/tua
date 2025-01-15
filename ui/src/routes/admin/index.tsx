import { clientOnly } from "@solidjs/start";
import Menu from "@/components/AdminMenu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// const Framework7Calendar = clientOnly(
//   () => import("@/components/Framework7Calendar")
// );
import Calendar from "@/components/Calendar";

export default function CalendarR() {
  return (
    <main class="dark h-[340px]">
      <Menu />
      {/* <Framework7Calendar /> */}
      {/* <Carousel>
        <CarouselContent>
          <CarouselItem>...</CarouselItem>
          <CarouselItem>...</CarouselItem>
          <CarouselItem>...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
      <Calendar />
    </main>
  );
}
