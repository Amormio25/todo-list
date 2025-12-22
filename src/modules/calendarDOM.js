import { getCalendarDates } from "./calendar";

const createElementWithClass = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
};

const calendarContainer = createElementWithClass("div", "calendar");
const header = createElementWithClass("div", "header");

const prevBtn = createElementWithClass("button", null);
prevBtn.id = "prevBtn";
const prevIcon = document.createElement("i");
prevIcon.className = "fa fa-chevron-left";
prevBtn.appendChild(prevIcon);

const monthYearElement = createElementWithClass("div", "monthYear");
monthYearElement.id = "monthYear";

const nextBtn = createElementWithClass("button", null);
nextBtn.id = "nextBtn";
const nextIcon = document.createElement("i");
nextIcon.className = "fa fa-chevron-right";
nextBtn.appendChild(nextIcon);

header.appendChild(prevBtn);
header.appendChild(monthYearElement);
header.appendChild(nextBtn);

const daysElement = createElementWithClass("div", "days");
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
daysOfWeek.forEach((day) => {
  const dayElement = createElementWithClass("div", "day");
  dayElement.textContent = day;
  daysElement.appendChild(dayElement);
});

const datesElement = createElementWithClass("div", "dates");
datesElement.id = "dates";

calendarContainer.appendChild(header);
calendarContainer.appendChild(daysElement);
calendarContainer.appendChild(datesElement);

export const renderCalendar = (year, month) => {
  // Clear previous dates
  while (datesElement.firstChild) {
    datesElement.removeChild(datesElement.firstChild);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthYearElement.textContent = `${monthNames[month]} ${year}`;

  const dates = getCalendarDates(year, month);
  dates.forEach(({ date, isCurrentMonth }) => {
    const dateElement = createElementWithClass("div", "date");
    if (!isCurrentMonth) dateElement.classList.add("inactive");
    if (date.toDateString() === new Date().toDateString()) {
      dateElement.classList.add("active");
    }
    dateElement.textContent = date.getDate();

    dateElement.addEventListener("click", () => {
      const activeDate = datesElement.querySelector(".date.active");
      if (activeDate) activeDate.classList.remove("active");
      dateElement.classList.add("active");
    });

    datesElement.appendChild(dateElement);
  });
};

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

const currentDate = new Date();
renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

export const appendCalendarTo = (container) => {
  container.appendChild(calendarContainer);
};
