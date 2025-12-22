// const monthYearElement = document.querySelector("#monthYear");
// const datesElement = document.querySelector("#dates");
// const prevBtn = document.querySelector("#prevBtn");
// const nextBtn = document.querySelector("#nextBtn");

// let currentDate = new Date();

// export const updateCalendar = () => {
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   const firstDay = new Date(currentYear, currentMonth, 1);

//   // go to next month, day = 0 means last day of prev month
//   const lastDay = new Date(currentYear, currentMonth + 1, 0);
//   const totalDays = lastDay.getDate();
//   const firstDayIndex = firstDay.getDay();
//   const lastDayIndex = lastDay.getDay();

//   const monthYearString = currentDate.toLocaleString("default", {
//     month: "long",
//     year: "numeric",
//   });
//   monthYearElement.textContent = monthYearString;

//   let datesHTML = "";

//   // get the dates from the previous month that carry over
//   // goes from the furthest date up until day = 0 (last day of prev month)
//   for (let i = firstDayIndex; i > 0; i--) {
//     const prevDate = new Date(currentYear, currentMonth, -i + 1);
//     datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
//   }

//   for (let i = 1; i <= totalDays; i++) {
//     const date = new Date(currentYear, currentMonth, i);

//     // highlight current date by default
//     const activeClass =
//       date.toDateString() === new Date().toDateString() ? "active" : "";
//     datesHTML += `<div class="date ${activeClass}">${i}</div>`;
//   }

//   // get the dates from the next month that carry over
//   for (let i = 1; i < 7 - lastDayIndex; i++) {
//     const nextDate = new Date(currentYear, currentMonth + 1, i);
//     datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
//   }

//   datesElement.innerHTML = datesHTML;
// };

// prevBtn.addEventListener("click", () => {
//   currentDate.setMonth(currentDate.getMonth() - 1);
//   updateCalendar();
// });

// nextBtn.addEventListener("click", () => {
//   currentDate.setMonth(currentDate.getMonth() + 1);
//   updateCalendar();
// });

// updateCalendar();

// const monthYearElement = document.querySelector("#monthYear");
// const datesElement = document.querySelector("#dates");
// const prevBtn = document.querySelector("#prevBtn");
// const nextBtn = document.querySelector("#nextBtn");

// let currentDate = new Date();

export const getCalendarDates = (year, month) => {
  const dates = [];

  // total days is just the last day of the month
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDayIndex = new Date(year, month + 1, 0).getDay();

  // get the dates from the previous month that carry over
  // goes from the furthest date up until day = 0 (last day of prev month)
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(year, month, -i + 1);
    // const dateElement = document.createElement("div");
    // dateElement.classList.add("date inactive");
    // dateElement.textContent = prevDate.getDate();
    dates.push({ date: prevDate, isCurrentMonth: false });
  }

  for (let i = 1; i <= totalDays; i++) {
    const currentDate = new Date(year, month, i);
    dates.push({ date: currentDate, isCurrentMonth: true });
    // highlight current date by default
    // const activeClass =
    //   date.toDateString() === new Date().toDateString() ? "active" : "";
    // datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }

  // get the dates from the next month that carry over
  for (let i = 1; i < 7 - lastDayIndex; i++) {
    const nextDate = new Date(year, month + 1, i);
    // const dateElement = document.createElement("div");
    // dateElement.classList.add("date inactive");
    // dateElement.textContent = nextDate.getDate();
    dates.push({ date: nextDate, isCurrentMonth: false });
    // datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
  }

  return dates;
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
