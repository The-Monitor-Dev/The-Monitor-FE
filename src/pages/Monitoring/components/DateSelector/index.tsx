import React from "react";
import { DateRangePicker } from "react-date-range";
import { subDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ArrowDownIcon, CloseIcon } from "@assets/svg";

interface DateSelectorProps {
  dateRange: any;
  setDateRange: (range: any) => void;
  showDatePicker: boolean;
  toggleDatePicker: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  dateRange,
  setDateRange,
  showDatePicker,
  toggleDatePicker,
}) => (
  <>
    <button
      type="button"
      onClick={toggleDatePicker}
      className="flex h-[29px] items-center gap-1 rounded-[2px] border-1 border-neutral-200 bg-white py-1 pl-3 pr-1"
    >
      <div className="text-sm font-medium text-body3">
        {dateRange[0].startDate
          .toLocaleDateString()
          .replace(/\s/g, "")
          .slice(0, -1)}{" "}
        ~{" "}
        {dateRange[0].endDate
          .toLocaleDateString()
          .replace(/\s/g, "")
          .slice(0, -1)}
      </div>
      <ArrowDownIcon className="fill-neutral-600" />
    </button>

    {showDatePicker && (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-65">
        <div className="flex">
          <DateRangePicker
            editableDateInputs
            onChange={(item) =>
              setDateRange([
                {
                  startDate: item.selection.startDate || new Date(),
                  endDate: item.selection.endDate || new Date(),
                  key: "selection",
                },
              ])
            }
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            minDate={subDays(new Date(), 180)}
            maxDate={new Date()}
            months={2}
            direction="horizontal"
            className="overflow-hidden rounded"
          />
          <button
            type="button"
            className="ml-4 flex h-10 w-10 transform items-center justify-center rounded-full bg-white transition-transform hover:scale-125"
          >
            <CloseIcon type="button" onClick={toggleDatePicker} />
          </button>
        </div>
      </div>
    )}
  </>
);

export default DateSelector;
