export const getCalendarDates = (year, month) => {
  const dates = [];
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDayIndex = new Date(year, month + 1, 0).getDay();

  // get the dates from the previous month that carry over
  // goes from the furthest date up until day = 0 (last day of prev month)
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(year, month, -i + 1);
    dates.push({ date: prevDate, isCurrentMonth: false });
  }

  for (let i = 1; i <= totalDays; i++) {
    const currentDate = new Date(year, month, i);
    dates.push({ date: currentDate, isCurrentMonth: true });
  }

  // get the dates from the next month that carry over
  for (let i = 1; i < 7 - lastDayIndex; i++) {
    const nextDate = new Date(year, month + 1, i);
    dates.push({ date: nextDate, isCurrentMonth: false });
  }

  return dates;
};
