"use client";

import CalendarGridSection from "./grid/calendar-grid-section";
import CalendarHeaderSection from "./header/calendar-header-section";

export default function Calendar() {
  return (
    <div className="rounded-t-2xl pb-10 text-accent-foreground dark:text-muted-foreground">
      <CalendarHeaderSection />
      <CalendarGridSection />
    </div>
  );
}
