import React from 'react';
import { motion } from 'framer-motion';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import ConflictNotification from './components/ConflictNotification';
import { useCalendar } from './hooks/useCalendar';

function App() {
  const {
    currentDate,
    calendarDays,
    conflicts,
    showConflictNotification,
    goToNextMonth,
    goToPreviousMonth,
    handleDateChange,
    dismissConflictNotification,
  } = useCalendar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto p-6"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50">
          <CalendarHeader
            currentDate={currentDate}
            onPreviousMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
            onDateChange={handleDateChange}
          />
          <CalendarGrid days={calendarDays} />
        </div>
      </motion.div>

      {showConflictNotification && (
        <ConflictNotification
          conflicts={conflicts}
          onDismiss={dismissConflictNotification}
        />
      )}
    </div>
  );
}

export default App;