
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { getCompletedChallenges } from '@/lib/localStorage';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

interface ProgressCalendarProps {
  onDateSelect?: (date: Date) => void;
}

const ProgressCalendar = ({ onDateSelect }: ProgressCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  
  useEffect(() => {
    // Load completed challenges from localStorage
    const completed = getCompletedChallenges();
    setCompletedDates(completed);
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const handleDayClick = (day: Date) => {
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  // Start with the appropriate day of the week
  const startingDayOfWeek = startOfMonth(currentMonth).getDay();
  
  // Create array for days of week headers
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {/* Days of week header */}
          {weekDays.map(day => (
            <div key={day} className="text-center font-medium text-xs py-2">
              {day}
            </div>
          ))}
          
          {/* Empty cells before the first day of the month */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-start-${index}`} className="calendar-day empty"></div>
          ))}
          
          {/* Days of the month */}
          {daysInMonth.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const isToday = isSameDay(day, new Date());
            const isCompleted = completedDates.includes(dateStr);
            
            return (
              <div
                key={dateStr}
                className={`calendar-day ${isToday ? 'today' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <span>{format(day, 'd')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressCalendar;
