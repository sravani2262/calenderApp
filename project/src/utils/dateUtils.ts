import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { CalendarEvent, CalendarDay, ConflictingEvent } from '../types/calendar';

export const formatDate = (date: Date, formatString: string): string => {
  return format(date, formatString);
};

export const getCalendarDays = (currentDate: Date): CalendarDay[] => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return days.map(date => ({
    date,
    isCurrentMonth: isSameMonth(date, currentDate),
    isToday: isToday(date),
    events: [],
  }));
};

export const getNextMonth = (currentDate: Date): Date => {
  return addMonths(currentDate, 1);
};

export const getPreviousMonth = (currentDate: Date): Date => {
  return subMonths(currentDate, 1);
};

export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  const dateString = formatDate(date, 'yyyy-MM-dd');
  return events.filter(event => event.date === dateString);
};

export const detectEventConflicts = (events: CalendarEvent[]): ConflictingEvent[] => {
  const conflicts: ConflictingEvent[] = [];
  
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const event1 = events[i];
      const event2 = events[j];
      
      if (event1.date === event2.date) {
        const start1 = parseTime(event1.startTime);
        const end1 = parseTime(event1.endTime);
        const start2 = parseTime(event2.startTime);
        const end2 = parseTime(event2.endTime);
        
        // Check for time overlap
        if ((start1 < end2 && end1 > start2)) {
          const existingConflict = conflicts.find(c => 
            c.events.some(e => e.id === event1.id || e.id === event2.id)
          );
          
          if (existingConflict) {
            if (!existingConflict.events.some(e => e.id === event1.id)) {
              existingConflict.events.push(event1);
            }
            if (!existingConflict.events.some(e => e.id === event2.id)) {
              existingConflict.events.push(event2);
            }
            existingConflict.conflictLevel = existingConflict.events.length;
          } else {
            conflicts.push({
              events: [event1, event2],
              conflictLevel: 2
            });
          }
        }
      }
    }
  }
  
  return conflicts;
};

const parseTime = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};