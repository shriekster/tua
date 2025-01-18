import type { IonDateTimeWorkingParts } from "@/types/calendar";

export const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve();
    }, milliseconds);
  });

export const isDifferentMonthAndYear = (
  workingParts?: IonDateTimeWorkingParts,
  isoDate?: string
) => {
  console.log("DEFINED", !!workingParts && !!isoDate);
  if (workingParts && isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const isDifferent =
      workingParts.year !== year ||
      workingParts.month !== month ||
      workingParts.day !== day;
    console.log("YEAR", workingParts.year, year, workingParts.year !== year);
    console.log(
      "MONTH",
      workingParts.month,
      month,
      workingParts.month !== month
    );
    console.log("DAY", workingParts.day, day, workingParts.day !== day);
    console.log("DIFF", isDifferent);
    return isDifferent;
  }

  return false;
};
