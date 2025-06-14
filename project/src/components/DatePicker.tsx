import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, getYear, getMonth, getDaysInMonth, startOfMonth, getDay } from 'date-fns';

interface DatePickerProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ currentDate, onDateSelect, onClose }) => {
  const [selectedYear, setSelectedYear] = useState(getYear(currentDate));
  const [selectedMonth, setSelectedMonth] = useState(getMonth(currentDate));
  const [view, setView] = useState<'year' | 'month' | 'date'>('year');
  const pickerRef = useRef<HTMLDivElement>(null);

  const currentYear = getYear(new Date());
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setView('month');
  };

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setView('date');
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    onDateSelect(newDate);
    onClose();
  };

  const renderYearView = () => (
    <div className="grid grid-cols-3 gap-2 p-4">
      {years.map((year) => (
        <motion.button
          key={year}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleYearSelect(year)}
          className={`
            p-3 rounded-lg text-sm font-medium transition-colors
            ${year === currentYear 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }
          `}
        >
          {year}
        </motion.button>
      ))}
    </div>
  );

  const renderMonthView = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setView('year')}
          className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
        >
          {selectedYear}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => (
          <motion.button
            key={month}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMonthSelect(index)}
            className={`
              p-3 rounded-lg text-sm font-medium transition-colors
              ${index === getMonth(currentDate) && selectedYear === getYear(currentDate)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
          >
            {month.slice(0, 3)}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderDateView = () => {
    const daysInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth));
    const firstDayOfMonth = getDay(startOfMonth(new Date(selectedYear, selectedMonth)));
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setView('month')}
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            {months[selectedMonth]} {selectedYear}
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="p-2"></div>
          ))}
          {days.map((day) => {
            const isToday = 
              day === new Date().getDate() &&
              selectedMonth === getMonth(new Date()) &&
              selectedYear === getYear(new Date());
            
            return (
              <motion.button
                key={day}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDateSelect(day)}
                className={`
                  p-2 rounded-lg text-sm font-medium transition-colors
                  ${isToday
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-200 text-gray-700'
                  }
                `}
              >
                {day}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        ref={pickerRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span className="font-semibold">Date Picker</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {view === 'year' && renderYearView()}
            {view === 'month' && renderMonthView()}
            {view === 'date' && renderDateView()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default DatePicker;