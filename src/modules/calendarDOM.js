// import { getCalendarDates } from "./calendar";

// const monthYearElement = document.querySelector("#monthYear");
// const prevBtn = document.querySelector("#prevBtn");
// const nextBtn = document.querySelector("#nextBtn");
// const datesElement = document.querySelector("#dates");

// export const renderCalendar = (year, month) => {
//   // Clear previous dates
//   while (datesElement.firstChild) {
//     datesElement.removeChild(datesElement.firstChild);
//   }

//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   monthYearElement.textContent = `${monthNames[month]} ${year}`;

//   const dates = getCalendarDates(year, month);
//   dates.forEach(({ date, isCurrentMonth }) => {
//     const dateElement = document.createElement("div");
//     dateElement.classList.add("date");
//     if (!isCurrentMonth) dateElement.classList.add("inactive");
//     if (date.toDateString() === new Date().toDateString()) {
//       dateElement.classList.add("active");
//     }
//     dateElement.textContent = date.getDate();

//     dateElement.addEventListener("click", () => {
//       const activeDate = datesElement.querySelector(".date.active");
//       if (activeDate) activeDate.classList.remove("active");
//       dateElement.classList.add("active");
//     });

//     datesElement.appendChild(dateElement);
//   });
// };

// prevBtn.addEventListener("click", () => {
//   currentDate.setMonth(currentDate.getMonth() - 1);
//   renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
// });

// nextBtn.addEventListener("click", () => {
//   currentDate.setMonth(currentDate.getMonth() + 1);
//   renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
// });

// const currentDate = new Date();
// renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
