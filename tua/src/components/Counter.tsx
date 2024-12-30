import { createSignal } from "solid-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Index } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <>
      {/* <Button
        // class="increment"
        onClick={() => setCount(count() + 1)}
        type="button"
      >
        Clicks: {count()}
      </Button> */}

      <Carousel class="w-full max-w-sm">
        <CarouselContent class="-ml-1">
          <Index each={Array.from({ length: 5 })}>
            {(_, index) => (
              <CarouselItem class="pl-1 md:basis-1/2 lg:basis-1/3">
                <div class="p-1">
                  <Card>
                    <CardContent class="flex aspect-square items-center justify-center p-6">
                      <span class="text-2xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )}
          </Index>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
