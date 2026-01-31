export interface BusinessStatus {
  isOpen: boolean;
  message: string;
  nextChange: { day: string; time: string } | null;
}

interface DaySchedule {
  opens: number; // 24-hour format (e.g., 16 for 4 PM)
  closes: number;
}

const SCHEDULE: Record<string, DaySchedule | null> = {
  Monday: null,
  Tuesday: null,
  Wednesday: { opens: 16, closes: 21 }, // 4 PM - 9 PM
  Thursday: { opens: 16, closes: 22 },  // 4 PM - 10 PM
  Friday: { opens: 16, closes: 23 },    // 4 PM - 11 PM
  Saturday: { opens: 14, closes: 23 },  // 2 PM - 11 PM
  Sunday: { opens: 14, closes: 21 },    // 2 PM - 9 PM
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getBrisbaneDate(): Date {
  // Get current time in Brisbane (AEST/AEDT)
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Brisbane',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const getValue = (type: string) => parts.find(p => p.type === type)?.value || '0';

  return new Date(
    parseInt(getValue('year')),
    parseInt(getValue('month')) - 1,
    parseInt(getValue('day')),
    parseInt(getValue('hour')),
    parseInt(getValue('minute')),
    parseInt(getValue('second'))
  );
}

function formatTime(hour: number): string {
  if (hour === 0) return '12:00 AM';
  if (hour < 12) return `${hour}:00 AM`;
  if (hour === 12) return '12:00 PM';
  return `${hour - 12}:00 PM`;
}

export function getBusinessStatus(): BusinessStatus {
  const brisbaneNow = getBrisbaneDate();
  const currentDay = DAYS[brisbaneNow.getDay()];
  const currentHour = brisbaneNow.getHours();
  const currentMinute = brisbaneNow.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const todaySchedule = SCHEDULE[currentDay];

  // Check if open today
  if (todaySchedule) {
    const opensInMinutes = todaySchedule.opens * 60;
    const closesInMinutes = todaySchedule.closes * 60;

    if (currentTimeInMinutes >= opensInMinutes && currentTimeInMinutes < closesInMinutes) {
      // Currently open
      const closingTime = formatTime(todaySchedule.closes);
      return {
        isOpen: true,
        message: `Open now · Closes at ${closingTime}`,
        nextChange: { day: 'Today', time: closingTime },
      };
    }
  }

  // Find next opening
  let daysChecked = 0;
  let checkDay = brisbaneNow.getDay();

  while (daysChecked < 7) {
    checkDay = (checkDay + 1) % 7;
    daysChecked++;

    const dayName = DAYS[checkDay];
    const schedule = SCHEDULE[dayName];

    if (schedule) {
      const openingTime = formatTime(schedule.opens);
      const dayLabel = daysChecked === 1 ? 'Tomorrow' : dayName;

      return {
        isOpen: false,
        message: `Closed · Opens ${dayLabel} at ${openingTime}`,
        nextChange: { day: dayLabel, time: openingTime },
      };
    }
  }

  // Fallback (should never reach here with a valid schedule)
  return {
    isOpen: false,
    message: 'Closed',
    nextChange: null,
  };
}
