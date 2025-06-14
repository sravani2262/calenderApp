import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, AlertTriangle } from 'lucide-react';
import { CalendarEvent } from '../types/calendar';
import { formatDate, detectEventConflicts } from '../utils/dateUtils';

interface EventModalProps {
  events: CalendarEvent[];
  date: Date;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ events, date, onClose }) => {
  const conflicts = detectEventConflicts(events);
  const hasConflicts = conflicts.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {formatDate(date, 'EEEE, MMMM d, yyyy')}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {events.length} event{events.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {hasConflicts && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700">
                {conflicts.length} scheduling conflict{conflicts.length !== 1 ? 's' : ''} detected
              </span>
            </motion.div>
          )}
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {events
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((event, index) => {
                const isConflicted = conflicts.some(conflict =>
                  conflict.events.some(e => e.id === event.id)
                );

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      p-4 rounded-lg border-l-4 
                      ${isConflicted ? 'bg-red-50 border-red-400' : 'bg-gray-50'}
                    `}
                    style={{ borderLeftColor: event.color }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      {isConflicted && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.startTime} - {event.endTime}</span>
                      <span className="text-gray-400">({event.duration} min)</span>
                    </div>
                    
                    {event.description && (
                      <p className="text-sm text-gray-700">{event.description}</p>
                    )}
                  </motion.div>
                );
              })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;