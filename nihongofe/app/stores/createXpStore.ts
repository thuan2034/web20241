import dayjs from "dayjs";
import type { BoundStateCreator } from "~/hooks/useBoundStore";
import type { DateString } from "~/utils/dateString";
import { toDateString } from "~/utils/dateString";

const addXpToday = (xpByDate: XpByDate, xp: number): XpByDate => {
  return addXp(xpByDate, xp, dayjs());
};

const addXp = (xpByDate: XpByDate, xp: number, date: dayjs.Dayjs): XpByDate => {
  return {
    ...xpByDate,
    [toDateString(date)]: xpAt(xpByDate, date) + xp,
  };
};

const xpAt = (xpByDate: XpByDate, date: dayjs.Dayjs): number => {
  return xpByDate[toDateString(date)] ?? 0;
};

type XpByDate = Record<DateString, number>;

export type XpSlice = {
  xpByDate: XpByDate;
  increaseXp: (by: number) => void;
  xpToday: () => number;
  xpThisWeek: () => number;
};

export const createXpSlice: BoundStateCreator<XpSlice> = (set, get) => ({
  xpByDate: {}, 
  increaseXp: () => {},
  xpToday: () => 0, 
  xpThisWeek: () => 0, 
});
