import { CalendarIcon } from "lucide-react";
import {
  Button,
  Calendar,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "shadcn-ui";
import type { DateRange } from "../types/date";

export default function DateRangePicker({
  range,
  setRange,
}: {
  range: DateRange;
  setRange: (range: DateRange) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" className={cn("w-fit justify-start")} />
        }
      >
        <CalendarIcon />
        {range.from.toDateString()} - {range.to.toDateString()}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          captionLayout="dropdown"
          selected={range}
          defaultMonth={range.from}
          max={365}
          onSelect={(selected) => {
            if (!selected?.from) return;
            setRange({
              from: selected.from,
              to: selected.to ?? selected.from,
            });
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
