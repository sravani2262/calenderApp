import { useState, useEffect, useMemo } from 'react';
import { CalendarEvent, CalendarDay, ConflictingEvent } from '../types/calendar';
import { getCalendarDays, getNextMonth, getPreviousMonth, getEventsForDate, detectEventConflicts } from '../utils/dateUtils';
import eventsData from '../data/events.json';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<CalendarEvent[]>(eventsData as CalendarEvent[]);
  const [showConflictNotification, setShowConflictNotification] = useState(false);

  const calendarDays = useMemo(() => {
    const days = getCalendarDays(currentDate);
    return days.map(day => ({
      ...day,
      events: getEventsForDate(events, day.date),
    }));
  }, [currentDate, events]);

  const conflicts = useMemo(() => {
    return detectEventConflicts(events);
  }, [events]);

  const goToNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
  };

  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  useEffect(() => {
    if (conflicts.length > 0) {
      setShowConflictNotification(true);
    }
  }, [conflicts]);

  return {
    currentDate,
    calendarDays,
    events,
    conflicts,
    showConflictNotification,
    goToNextMonth,
    goToPreviousMonth,
    handleDateChange,
    dismissConflictNotification: () => setShowConflictNotification(false),
  };
};