import { Calendar as CalendarNamespace } from "framework7/components/calendar";

export type Events = Array<CalendarNamespace.DateRangeItem & { color: string }>;
