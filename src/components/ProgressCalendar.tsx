import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

const ProgressCalendar = ({ onDateSelect, completedDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const futureDates = currentMonth.toISOString().split("T")[0];

  const addOneDay = (dateString) => {
    const date = new Date(dateString); // Create a Date object from the string
    date.setDate(date.getDate() + 1); // Add one day
    return date.toISOString().split("T")[0]; // Convert to 'YYYY-MM-DD' format
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleDayClick = (day: Date) => {
    if (onDateSelect && !isDateGreaterThanToday(day)) {
      onDateSelect(day); // Allow selection only if the date is not greater than today
    }
  };

  const isCompleted = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (completedDates) {
      return completedDates.includes(dateStr);
    }
  };

  const isDateGreaterThanToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to midnight
    date.setHours(0, 0, 0, 0); // Reset to midnight
    return date > today; // Compare the date
  };

  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Start with the appropriate day of the week
  const startingDayOfWeek = startOfMonth(currentMonth).getDay();

  // Create array for days of week headers
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <Calendar className="h-5 w-5" />
        <h2 className="font-semibold text-lg">Progress Calendar</h2>
        <div></div> {/* Empty div for flex spacing */}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium text-lg">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Days of week header */}
          {weekDays.map((day) => (
            <div key={day} className="text-center font-medium text-xs py-2">
              {day}
            </div>
          ))}

          {/* Empty cells before the first day of the month */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div
              key={`empty-start-${index}`}
              className="calendar-day empty"
            ></div>
          ))}

          {/* Days of the month */}
          {daysInMonth.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const isFutureDate = isDateGreaterThanToday(day);
            return (
              <div
                key={dateStr}
                className={`calendar-day ${
                  isFutureDate ? "text-gray-400 cursor-not-allowed" : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                <span>{format(day, "d")}</span>
                {isCompleted(day) && (
                  <div className="grid w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressCalendar;
