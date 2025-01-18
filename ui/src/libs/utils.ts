import { isValid } from "date-fns";
import type { IonDateTimeWorkingParts } from "@/types/calendar";

type HTMLIonDatetimeElementRef = HTMLIonDatetimeElement & {
  workingParts?: IonDateTimeWorkingParts;
};

const DECEMBER_MONTH_INDEX = 11;

export const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve();
    }, milliseconds);
  });

export const isCalendarMonthDisplayed = (
  calendarRef?: HTMLIonDatetimeElementRef,
  isoDate?: string
) => {
  const workingParts = calendarRef?.workingParts;

  if (workingParts && isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const isDifferent =
      workingParts.year !== year || workingParts.month !== month;

    return isDifferent;
  }

  return false;
};

export const getAllowedYearValues = (isoDate: string) => {
  const fromIsoDate = new Date(isoDate);

  const date = isValid(fromIsoDate) ? fromIsoDate : new Date();
  const year = date.getFullYear();

  const allowedYearValues = [year];

  if (date.getMonth() === DECEMBER_MONTH_INDEX) {
    allowedYearValues.push(year + 1);
  }

  return allowedYearValues;
};
