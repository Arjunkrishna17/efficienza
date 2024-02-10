import { DateTime } from "luxon";

// Example GitHub's ISO 8601 date format: '2023-07-29T08:02:27Z'

export const isOneMonth = (githubDate: string) => {
  const createdDate = DateTime.fromISO(githubDate);

  const currentDate = DateTime.now();

  const differenceInMonths = currentDate.diff(createdDate, "months").months;

  return differenceInMonths < 1;
};
