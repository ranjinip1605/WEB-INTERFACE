// =========================
// Smart Task Manager
// =========================

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const taskPriority = document.getElementById("taskPriority");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");
const scheduledList = document.getElementById("scheduledList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Show tasks when page loads
displayTasks();

// Add Task Button
addTaskBtn.addEventListener("click", addTask);

// =========================
// Add Task
// =========================

function addTask() {

    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskInput.value,
        date: taskDate.value,
        time: taskTime.value,
        priority: taskPriority.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    clearInputs();

    displayTasks();

}

// =========================
// Save Tasks
// =========================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// =========================
// Clear Input Fields
// =========================

function clearInputs() {

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
    taskPriority.value = "High";

}

// =========================
// Display Tasks
// =========================

function displayTasks() {

    taskList.innerHTML = "";
    scheduledList.innerHTML = "";
    completedList.innerHTML = "";

    let pending = 0;
    let completed = 0;

    const now = new Date();

    tasks.forEach((task) => {

        const card = document.createElement("div");
        card.className = "task-card";

        let priorityClass = "low";

        if (task.priority === "High") {
            priorityClass = "high";
        }
        else if (task.priority === "Medium") {
            priorityClass = "medium";
        }

        card.innerHTML = `

        <div class="task-info">

            <h3>${task.name}</h3>

            <p><strong>📅 Date:</strong> ${task.date || "Not Selected"}</p>

            <p><strong>🕒 Time:</strong> ${task.time || "Not Selected"}</p>

            <span class="priority ${priorityClass}">
                ${task.priority}
            </span>

        </div>

        <div class="task-buttons">

            ${
                !task.completed
                ?
                `<button class="complete-btn"
                onclick="completeTask(${task.id})">
                ✔ Complete
                </button>`
                :
                ""
            }

            <button class="delete-btn"
            onclick="deleteTask(${task.id})">
            🗑 Delete
            </button>

        </div>

        `;

        if (task.completed) {

            completed++;

            completedList.appendChild(card);

        }
        else {

            pending++;

            if (task.date && task.time) {

                const taskDateTime = new Date(task.date + "T" + task.time);

                if (taskDateTime > now) {

                    scheduledList.appendChild(card);

                }
                else {

                    taskList.appendChild(card);

                }

            }
            else {

                taskList.appendChild(card);

            }

        }

    });

    pendingCount.innerText = pending;
    completedCount.innerText = completed;

}

// =========================
// Complete Task
// =========================

function completeTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    task.completed = true;

    saveTasks();

    displayTasks();

    // Automatically delete after 2 seconds
    setTimeout(() => {

        tasks = tasks.filter(task => task.id !== id);

        saveTasks();

        displayTasks();

    }, 2000);

}

// =========================
// Delete Task
// =========================

function deleteTask(id) {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) {
        return;
    }

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    displayTasks();

}

// =========================
// Auto Refresh
// =========================
// If a scheduled task reaches its time,
// it automatically moves to Current Tasks.

setInterval(() => {

    displayTasks();

}, 60000);

// =========================
// Press Enter to Add Task
// =========================

taskInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        addTask();

    }

});

// =========================
// Today's Date as Default
// =========================

window.onload = function(){

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    taskDate.value = `${year}-${month}-${day}`;

    displayTasks();

};

// =========================
// Sort Tasks by Date & Time
// =========================

tasks.sort((a, b) => {

    const dateA = new Date((a.date || "9999-12-31") + "T" + (a.time || "23:59"));

    const dateB = new Date((b.date || "9999-12-31") + "T" + (b.time || "23:59"));

    return dateA - dateB;

});

// Refresh after sorting

displayTasks();

// =========================
// End of Script
// =========================