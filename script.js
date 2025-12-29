"use strict";

/* ------------------ DATA ------------------ */
const habits = [
  { name: "Gym Workout", done: [] },
  { name: "Wake up at 6 AM", done: [] },
  { name: "Drink 3L Water", done: [] },
  { name: "Read 10 Pages", done: [] }
];

/* ------------------ ELEMENTS ------------------ */
const dateContainer = document.getElementById("dates");
const habitList = document.getElementById("habitList");
const completedEl = document.getElementById("completed");
const goalEl = document.getElementById("goal");
const leftEl = document.getElementById("left");
const monthYearEl = document.getElementById("monthYear");

/* ------------------ DATE SETUP ------------------ */
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
let selectedDate = null;

monthYearEl.textContent = today.toLocaleString("default", {
  month: "long",
  year: "numeric"
});

/* ------------------ CALENDAR ------------------ */
function loadCalendar() {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  dateContainer.innerHTML = "";

  for (let i = 0; i < startDay; i++) {
    dateContainer.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const div = document.createElement("div");
    div.className = "date";
    div.textContent = d;
    div.addEventListener("click", () => selectDate(d, div));
    dateContainer.appendChild(div);
  }
}

/* ------------------ SELECT DATE ------------------ */
function selectDate(day, element) {
  selectedDate = day;

  document.querySelectorAll(".date").forEach(d =>
    d.classList.remove("active")
  );

  element.classList.add("active");
  renderHabits();
}

/* ------------------ HABITS ------------------ */
function renderHabits() {
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    const checked = habit.done.includes(selectedDate);

    const div = document.createElement("div");
    div.className = "habit";
    div.innerHTML = `
      <span>${habit.name}</span>
      <input type="checkbox" ${checked ? "checked" : ""}>
    `;

    div.querySelector("input").addEventListener("change", () =>
      toggleHabit(index)
    );

    habitList.appendChild(div);
  });

  updateOverview();
}

function toggleHabit(index) {
  if (!selectedDate) return;

  const habit = habits[index];
  const pos = habit.done.indexOf(selectedDate);

  if (pos > -1) {
    habit.done.splice(pos, 1);
  } else {
    habit.done.push(selectedDate);
  }

  updateOverview();
}

/* ------------------ OVERVIEW ------------------ */
function updateOverview() {
  const totalCompleted = habits.reduce(
    (sum, h) => sum + h.done.length,
    0
  );

  const totalGoal =
    habits.length * new Date(year, month + 1, 0).getDate();

  completedEl.textContent = totalCompleted;
  goalEl.textContent = totalGoal;
  leftEl.textContent = totalGoal - totalCompleted;
}

/* ------------------ INIT ------------------ */
loadCalendar();
