import { Button } from "@/components/ui/button";
import {
  getCurrentDate,
  useCalendarNavigation,
  useDateFilters,
} from "@/lib/hooks";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function CalendarHeader() {
  const [{ year, month }] = useDateFilters();
  const currentDate = getCurrentDate({ year, month });
  const { goToNextMonth, goToPrevMonth, displayDate } = useCalendarNavigation(
    new Date(currentDate)
  );

  return (
    <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
      <div className="w-full flex items-center justify-between">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={goToPrevMonth}
          className="rounded-full border p-1 transition-colors hover:bg-slate-100 sm:p-2"
        >
          <ChevronLeftIcon className="size-5" />
        </Button>
        <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl">
          {format(displayDate, "yyyy")}년{" "}
          {format(displayDate, "MMMM", { locale: ko })}
        </h1>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={goToNextMonth}
          className="rounded-full border p-1 transition-colors hover:bg-slate-100 sm:p-2"
        >
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
