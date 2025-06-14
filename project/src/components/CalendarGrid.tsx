import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDay } from '../types/calendar';
import CalendarCell from './CalendarCell';

interface CalendarGridProps {
  days: CalendarDay[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ days }) => {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="bg-white shadow-inner">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day, index) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 text-center bg-gradient-to-b from-gray-50 to-gray-100"
          >
            <div className="text-sm font-semibold text-gray-600 mb-1">
              {day}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">
              {day.slice(0, 3)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 bg-gray-50">
        {days.map((day, index) => (
          <motion.div
            key={day.date.toISOString()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.01, 
              duration: 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="border-r border-b border-gray-200 last:border-r-0"
          >
            <CalendarCell day={day} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;