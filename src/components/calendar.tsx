"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import locale from "dayjs/locale/fr";
import weekdayPlugin from "dayjs/plugin/weekday";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

export function Calendar() {
  const now = dayjs().locale({
    ...locale
  });
  const [currentMonth, setCurrentMonth] = useState(now);
  const [arrayOfDays, setArrayOfDays] = useState<any[]>([]);

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const renderHeader = () => {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="flex w-full items-center justify-between p-2 text-center font-semibold">
        <button
          className="cursor-pointer rounded-md p-2 px-3 hover:bg-blue-100"
          onClick={prevMonth}
        >
          <ChevronsLeftIcon className="h-4 w-4" />
        </button>
        <span>{currentMonth.format(dateFormat)}</span>
        <button
          className="cursor-pointer rounded-md p-2 px-3 hover:bg-blue-100"
          onClick={nextMonth}
        >
          <ChevronsRightIcon className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "ddd";
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="rounded-md p-2 text-center text-muted-foreground"
        >
          {now.weekday(i).format(dateFormat)}
        </div>
      );
    }
    return (
      <div className="grid w-full max-w-3xl grid-cols-7 gap-4">{days}</div>
    );
  };

  const formateDateObject = (date: dayjs.Dayjs) => {
    const clonedObject = { ...date.toObject() };
    const formatedObject = {
      date: date,
      day: clonedObject.date,
      month: clonedObject.months,
      year: clonedObject.years,
      isCurrentMonth: clonedObject.months === currentMonth.month(),
      isCurrentDay: date.isToday()
    };

    return formatedObject;
  };

  const getAllDays = () => {
    let currentDate = currentMonth.startOf("month").weekday(0);
    const nextMonth = currentMonth.add(1, "month").month();
    let allDates = [];
    let weekDates = [];
    let weekCounter = 1;
    while (currentDate.weekday(0).toObject().months !== nextMonth) {
      const formated = formateDateObject(currentDate);
      weekDates.push(formated);
      if (weekCounter === 7) {
        allDates.push({ dates: weekDates });
        weekDates = [];
        weekCounter = 0;
      }
      weekCounter++;
      currentDate = currentDate.add(1, "day");
    }
    setArrayOfDays(allDates);
  };

  useEffect(() => {
    getAllDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  const renderCells = () => {
    const rows: any[] = [];
    let days: any[] = [];
    arrayOfDays.forEach((week, index) => {
      week.dates.forEach((d: any, i: number) => {
        days.push(
          <Link
            href={`/calendar/${d.date.format("YYYY-MM-DD")}`}
            key={i}
            className={cn(
              !d.isCurrentMonth
                ? "pointer-events-none text-gray-300"
                : d.isCurrentDay
                  ? "rounded-md bg-gray-200"
                  : ""
            )}
          >
            <div className="cursor-pointer rounded-md p-2 text-center hover:bg-blue-100">
              {d.day}
            </div>
          </Link>
        );
      });
      rows.push(
        <div key={index} className="grid w-full max-w-3xl grid-cols-7 gap-2">
          {days}
        </div>
      );
      days = [];
    });
    return <>{rows}</>;
  };

  return (
    <>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </>
  );
}
