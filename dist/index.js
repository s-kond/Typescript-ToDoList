"use strict";
const taskList = document.querySelector(".taskList");
const taskForm = document.querySelector(".taskForm");
const taskInput = document.querySelector(".newTaskInput");
const descriptionInput = document.querySelector(".newDescriptionInput");
const tasks = loadTasks();
tasks.map((task) => createTask(task));
taskForm === null || taskForm === void 0 ? void 0 : taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (descriptionInput === null ||
        taskInput === null ||
        (descriptionInput === null || descriptionInput === void 0 ? void 0 : descriptionInput.value) === undefined ||
        (descriptionInput === null || descriptionInput === void 0 ? void 0 : descriptionInput.value) === "" ||
        (taskInput === null || taskInput === void 0 ? void 0 : taskInput.value) === undefined ||
        (taskInput === null || taskInput === void 0 ? void 0 : taskInput.value) === "") {
        return;
    }
    const newTask = {
        id: Math.random().toString(),
        task: taskInput === null || taskInput === void 0 ? void 0 : taskInput.value,
        description: descriptionInput === null || descriptionInput === void 0 ? void 0 : descriptionInput.value,
        isCompleted: false,
        createdAt: new Date(),
    };
    tasks.push(newTask);
    saveTasks();
    createTask(newTask);
    taskInput.value = "";
    descriptionInput.value = "";
});
function createTask(task) {
    const item = document.createElement("li");
    const title = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isCompleted;
    checkbox.addEventListener("change", () => {
        task.isCompleted = checkbox.checked;
        title.classList.toggle("checked");
        saveTasks();
    });
    title.append(checkbox, task.task);
    const description = document.createElement("p");
    description.textContent = task.description;
    item.append(title, description);
    taskList === null || taskList === void 0 ? void 0 : taskList.append(item);
}
function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
    const tasksJSON = localStorage.getItem("TASKS");
    if (tasksJSON === null) {
        return [];
    }
    return JSON.parse(tasksJSON);
}
