import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  task: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
};

const taskList = document.querySelector<HTMLUListElement>('.taskList');
const taskForm = document.querySelector<HTMLFormElement>('.taskForm');
const taskInput = document.querySelector<HTMLInputElement>('.newTaskInput');
const descriptionInput = document.querySelector<HTMLInputElement>(
  '.newDescriptionInput',
);
const tasks: Task[] = loadTasks();
tasks.map((task) => createTask(task));

taskForm?.addEventListener('submit', (e): void => {
  e.preventDefault();
  if (
    descriptionInput === null ||
    taskInput === null ||
    descriptionInput?.value === undefined ||
    descriptionInput?.value === '' ||
    taskInput?.value === undefined ||
    taskInput?.value === ''
  ) {
    return;
  }
  const newTask: Task = {
    id: uuidV4(),
    task: taskInput?.value,
    description: descriptionInput?.value,
    isCompleted: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks();
  createTask(newTask);
  taskInput.value = '';
  descriptionInput.value = '';
});

function createTask(task: Task) {
  const item = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.isCompleted;
  checkbox.addEventListener('change', () => {
    task.isCompleted = checkbox.checked;
    saveTasks();
  });
  const title = document.createElement('label');
  title.append(checkbox, task.task);
  const description = document.createElement('p');
  description.textContent = task.description;
  item.append(title, description);
  taskList?.append(item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const tasksJSON = localStorage.getItem('TASKS');
  if (tasksJSON === null) {
    return [];
  }
  return JSON.parse(tasksJSON);
}
