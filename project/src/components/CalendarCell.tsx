import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDay } from '../types/calendar';
import { formatDate } from '../utils/dateUtils';
import EventModal from './EventModal';

interface CalendarCellProps {
  day: CalendarDay;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ day }) => {
  const [showEventModal, setShowEventModal] = useState(false);
  const dayNumber = formatDate(day.date, 'd');
  const hasEvents = day.events.length > 0;
  const hasConflicts = day.events.length > 1;

  const handleCellClick = () => {
    if (hasEvents) {
      setShowEventModal(true);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ 
          scale: hasEvents ? 1.02 : 1,
          backgroundColor: hasEvents ? '#f8fafc' : '#ffffff'
        }}
        onClick={handleCellClick}
        className={`
          min-h-[140px] p-3 cursor-pointer transition-all duration-200 relative
          ${!day.isCurrentMonth ? 'bg-gray-50/50 text-gray-400' : 'bg-white'}
          ${day.isToday ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200' : ''}
          ${hasEvents ? 'hover:shadow-md' : 'hover:bg-gray-50'}
        `}
      >
        <div className="flex justify-between items-start mb-3">
          <motion.span
            whileHover={{ scale: 1.1 }}
            className={`
              text-sm font-semibold transition-all duration-200
              ${day.isToday 
                ? 'bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg' 
                : !day.isCurrentMonth 
                  ? 'text-gray-400' 
                  : 'text-gray-900 hover:text-blue-600'
              }
            `}
          >
            {dayNumber}
          </motion.span>
          
          {hasConflicts && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex items-center space-x-1"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            </motion.div>
          )}
        </div>

        <div className="space-y-1.5">
          <AnimatePresence>
            {day.events.slice(0, 3).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ scale: 1.05, x: 2 }}
                className="text-xs p-2 rounded-lg truncate shadow-sm border-l-3 transition-all duration-200"
                style={{ 
                  backgroundColor: event.color + '15', 
                  borderLeftColor: event.color,
                  color: event.color 
                }}
                title={`${event.title} (${event.startTime} - ${event.endTime})`}
              >
                <div className="font-semibold truncate mb-0.5">{event.title}</div>
                <div className="text-xs opacity-80 flex items-center">
                  <span className="w-1 h-1 bg-current rounded-full mr-1"></span>
                  {event.startTime}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {day.events.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="text-xs text-gray-500 font-medium bg-gray-100 rounded-lg p-2 text-center cursor-pointer hover:bg-gray-200 transition-colors"
            >
              +{day.events.length - 3} more events
            </motion.div>
          )}
        </div>

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      <AnimatePresence>
        {showEventModal && (
          <EventModal
            events={day.events}
            date={day.date}
            onClose={() => setShowEventModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CalendarCell;