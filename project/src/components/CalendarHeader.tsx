import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../utils/dateUtils';
import DatePicker from './DatePicker';

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onDateChange: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onDateChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200"
      >
        <div className="flex items-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDatePicker(true)}
            className="flex items-center space-x-3 group"
          >
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Calendar
              </h1>
              <p className="text-sm text-gray-500">Click to navigate</p>
            </div>
          </motion.button>
          
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm"
            >
              {formatDate(currentDate, 'MMMM yyyy')}
            </motion.div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Plus className="h-5 w-5 text-gray-600" />
          </motion.button>
          
          <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden">
            <motion.button
              whileHover={{ backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.95 }}
              onClick={onPreviousMonth}
              className="p-3 hover:bg-gray-50 transition-colors border-r border-gray-200"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </motion.button>
            
            <motion.button
              whileHover={{ backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.95 }}
              onClick={onNextMonth}
              className="p-3 hover:bg-gray-50 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDatePicker && (
          <DatePicker
            currentDate={currentDate}
            onDateSelect={onDateChange}
            onClose={() => setShowDatePicker(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CalendarHeader;