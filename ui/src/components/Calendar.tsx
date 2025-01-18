import { clientOnly } from "@solidjs/start";

const ClientOnlyCalendar = clientOnly(
  () => import("@/components/ClientOnlyCalendar")
);

export default function Calendar() {
  return <ClientOnlyCalendar />;
}
