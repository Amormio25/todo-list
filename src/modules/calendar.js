import { format, addDays, addHours } from "date-fns";

const monthYearElement = document.querySelector("#monthYear");
const datesElement = document.querySelector("#dates");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let currentDate = new Date();

export const updateCalendar = () => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1);

  // go to next month, day = 0 means last day of prev month
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();

  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  monthYearElement.textContent = monthYearString;

  let datesHTML = "";

  // get the dates from the previous month that carry over
  // goes from the furthest date up until day = 0 (last day of prev month)
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, -i + 1);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);

    // highlight current date by default
    const activeClass =
      date.toDateString() === new Date().toDateString() ? "active" : "";
    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }

  // get the dates from the next month that carry over
  for (let i = 1; i < 7 - lastDayIndex; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
  }

  datesElement.innerHTML = datesHTML;
};

// prevBtn.addEventListener("click", () => {
//   currentDate.setMonth(currentDate.getMonth() - 1);
//   updateCalendar();
// });

// nextBtn.addEventListener("click", () => {
//   currentDate.setMonth(currentDate.getMonth() + 1);
//   updateCalendar();
// });

// updateCalendar();
