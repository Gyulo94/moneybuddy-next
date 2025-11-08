"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface DatePickerProps {
  setDateValue: React.Dispatch<React.SetStateAction<Date | null>>;
  value?: Date | null;
}

export function DatePicker({ setDateValue, value }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value ?? undefined);
  useEffect(() => {
    setDate(value ?? undefined);
  }, [value]);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] justify-start text-left font-normal cursor-pointer",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "yyyy-MM-dd") : "날짜 선택"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            setDateValue(selectedDate!);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
