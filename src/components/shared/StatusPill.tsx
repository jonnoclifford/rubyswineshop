'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getBusinessStatus, type BusinessStatus } from '@/lib/utils/business-hours';

export function StatusPill() {
  const [status, setStatus] = useState<BusinessStatus | null>(null);

  useEffect(() => {
    // Initial status
    setStatus(getBusinessStatus());

    // Update every 60 seconds
    const interval = setInterval(() => {
      setStatus(getBusinessStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy/5 border border-navy/10"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={`w-2 h-2 rounded-full ${
          status.isOpen ? 'bg-green-500' : 'bg-gray-400'
        }`}
        aria-hidden="true"
      />
      <span className="text-xs font-medium text-navy whitespace-nowrap">
        {status.message}
      </span>
    </motion.div>
  );
}
