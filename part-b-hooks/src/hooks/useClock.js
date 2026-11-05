import { useState, useEffect } from 'react';

/**
 * Custom Hook: useClock
 * Advanced requirement: Reusable clock hook that updates every second
 * and handles interval setup & teardown cleanly via useEffect return cleanup.
 */
export const useClock = (enabled = true) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!enabled) return;

    console.log('[useClock] Hook mounted: Bắt đầu interval đồng hồ.');
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      console.log('[useClock] Hook cleanup: Hủy interval đồng hồ khi unmount/disabled.');
      clearInterval(timerId);
    };
  }, [enabled]);

  const formatTimeString = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDateString = (date) => {
    const days = [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  };

  return {
    currentTime,
    formattedTime: formatTimeString(currentTime),
    formattedDate: formatDateString(currentTime),
  };
};

export default useClock;
