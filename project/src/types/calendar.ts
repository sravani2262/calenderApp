export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  duration: number; // in minutes
  color: string;
  description?: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface ConflictingEvent {
  events: CalendarEvent[];
  conflictLevel: number;
}