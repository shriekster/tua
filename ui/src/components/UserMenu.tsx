import { createSignal } from "solid-js";
import type { DialogTriggerProps } from "@kobalte/core/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HiSolidDocumentText } from "solid-icons/hi";
import TuaIcon from "./TuaIcon";
export default function AdminMenu() {
  const [isDialogOpen, setDialogOpen] = createSignal(false);

  const handleButtonClick = () => {
    setDialogOpen(false);
  };

  return (
    <nav class="flex justify-between p-2 bg-zinc-900 !w-[100%]">
      <TuaIcon />
      <span class="font-sans font-bold text-xl">TUA</span>
      <Dialog open={isDialogOpen()} onOpenChange={setDialogOpen}>
        <DialogTrigger
          as={(props: DialogTriggerProps) => (
            <Button
              variant="ghost"
              size="icon"
              class="relative flex"
              {...props}
            >
              <HiSolidDocumentText size={32} />
            </Button>
          )}
        />
        <DialogContent class="max-w-[95dvw] max-h-[95dvh] sm:max-w-[95dvw] md:max-w-[768px] bg-zinc-900 overflow-y-scroll py-0">
          <DialogHeader class="sticky top-0 bg-zinc-900 py-4">
            <DialogTitle>Termeni și condiții</DialogTitle>
            <DialogDescription>
              pentru participarea la simularea traseului utilitar-aplicativ
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4">
            <div>
              <span>
                Programarea pentru simularea traseului utilitar-aplicativ se
                face prin intermediul acestei pagini sau la numărul de telefon{" "}
                <a
                  href="tel:0766335811"
                  class="bg-green-950 rounded-sm p-[3px]"
                >
                  0766 335 811
                </a>
                .
              </span>
            </div>
            <div>
              <span>
                Accesul în cadrul proiectului se face pe baza unei adeverințe
                emise de către medicul de familie, care conține sintagma "Clinic
                sănătos pentru educație fizică și sport".
              </span>
            </div>
            <div>
              <span>
                Solicitarea unei programări prin intermediul acestei pagini
                implică acordul pentru stocarea numelui, prenumelui
                participanților și a numărului de telefon al persoanei care
                solicită programarea, unicul scop fiind constituirea unei liste
                cu participanții la simularea traseului utilitar-aplicativ.
              </span>
            </div>
            <div>
              <span>
                Participanții pot solicita oricând ștergerea acestor date, luând
                la cunoștință faptul că nu vor putea efectua programări pe
                această pagină fără oferirea datelor menționate anterior.
              </span>
            </div>
            <div>
              <span>
                Asociația Spirit Tânăr își rezervă dreptul de a selecta
                participanții în cadrul proiectului.
              </span>
            </div>
          </div>
          <DialogFooter class="sticky bottom-0 bg-zinc-900 py-4">
            <Button type="submit" onClick={handleButtonClick}>
              Am înțeles
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
