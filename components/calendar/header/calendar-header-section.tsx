import { DAYS_OF_WEEK } from "@/lib/constants";
import CalendarHeader from "./calendar-header";
import IncomeExpenseToggle from "./income-expense-toggle";

export default function CalendarHeaderSection() {
  return (
    <div className="w-full px-5 pt-7 sm:px-8 sm:pt-8 aspect-auto">
      <CalendarHeader />
      <IncomeExpenseToggle />

      <div className="grid w-full grid-cols-7 justify-between dark:text-muted-foreground">
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={index}
            className={`w-full py-2 text-center font-semibold ${
              index === 0 ? "text-red-500 dark:text-red-400" : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
