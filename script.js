const habits = [
  { name: "Gym Workout 🏋️", completed: 0, target: 20 },
  { name: "Wake up at 6AM ⏰", completed: 0, target: 30 },
  { name: "Drink 3L Water 💧", completed: 0, target: 30 },
  { name: "Read 10 Pages 📚", completed: 0, target: 30 }
];

const habitList = document.getElementById("habit-list");

function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const div = document.createElement("div");
    div.className = "habit";

    div.innerHTML = `
      <span>${habit.name}</span>
      <input type="checkbox" onchange="toggleHabit(${index})">
    `;

    habitList.appendChild(div);
  });
}

function toggleHabit(index) {
  habits[index].completed++;
  updateOverview();
}

function updateOverview() {
  let completed = habits.reduce((sum, h) => sum + h.completed, 0);
  let goal = habits.reduce((sum, h) => sum + h.target, 0);

  document.getElementById("completed").textContent = completed;
  document.getElementById("goal").textContent = goal;
  document.getElementById("left").textContent = goal - completed;
}

renderHabits();
updateOverview();
