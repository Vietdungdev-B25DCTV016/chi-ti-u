import React from 'react';
import useClock from '../hooks/useClock';

/**
 * Clock Component (Function Component)
 * Uses custom hook `useClock` (Advanced requirement).
 */
const Clock = () => {
  const { formattedTime, formattedDate } = useClock(true);

  return (
    <div className="clock-badge">
      <span className="clock-icon" role="img" aria-label="clock">
        ⏱️
      </span>
      <div className="clock-info">
        <span className="clock-time">{formattedTime}</span>
        <span className="clock-date">{formattedDate}</span>
      </div>
    </div>
  );
};

export default Clock;
