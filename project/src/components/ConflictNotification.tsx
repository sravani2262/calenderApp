import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { ConflictingEvent } from '../types/calendar';

interface ConflictNotificationProps {
  conflicts: ConflictingEvent[];
  onDismiss: () => void;
}

const ConflictNotification: React.FC<ConflictNotificationProps> = ({
  conflicts,
  onDismiss,
}) => {
  if (conflicts.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-40 max-w-sm"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-red-800">
              Scheduling Conflicts Detected
            </h4>
            <p className="text-sm text-red-700 mt-1">
              {conflicts.length} conflict{conflicts.length !== 1 ? 's' : ''} found with overlapping events.
            </p>
            <div className="mt-2 space-y-1">
              {conflicts.slice(0, 2).map((conflict, index) => (
                <div key={index} className="text-xs text-red-600">
                  {conflict.events.map(e => e.title).join(' & ')}
                </div>
              ))}
              {conflicts.length > 2 && (
                <div className="text-xs text-red-600">
                  +{conflicts.length - 2} more conflicts
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConflictNotification;