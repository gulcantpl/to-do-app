let tasks = [];
const taskList = document.getElementById('task-list');
const API_URL = 'http://localhost:3000/todos';

function addTask(taskText) {
  if (!taskText.trim()) return;
  tasks.push({ text: taskText, completed: false });
  renderTasks();
  sendTasksToBackend();
}

function removeTask(index) {
  if (index > -1 && index < tasks.length) {
    tasks.splice(index, 1);
    renderTasks();
    sendTasksToBackend();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  sendTasksToBackend();
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleComplete(index));

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add('completed');
    }

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-regular fa-square-minus"></i>';
    removeButton.title = 'Remove task';
    removeButton.onclick = () => removeTask(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeButton);
    taskList.appendChild(li);
  });
}

document.getElementById('add-task-btn').onclick = function () {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (!taskText) return;

  addTask(taskText);
  taskInput.value = '';
};

document.getElementById('clear-tasks-btn').onclick = function () {
  tasks = [];
  renderTasks();
};

function sendTasksToBackend() {
  const todosToSend = tasks.map((task) => ({
    title: task.text,
    completed: task.completed,
  }));

  // 1. Save to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // 2. Send to backend
  fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todosToSend),
  })
    .then((res) => res.json())
    .then((data) => console.log('Response from backend:', data))
    .catch((err) => console.error('Error sending to backend:', err));
}

function loadTasksFromBackend() {
  fetch(`${API_URL}`)
    .then((res) => res.json())
    .then((data) => {
      tasks = data.map((todo) => ({
        text: todo.title,
        completed: todo.completed,
      }));
      renderTasks();
    })
    .catch((err) => {
      console.warn('Error loading from backend:', err);

      // If backend is not available, load from localStorage
      const localData = localStorage.getItem('tasks');
      if (localData) {
        tasks = JSON.parse(localData);
        renderTasks();
      }
    });
}

// change the window.onload to load tasks from backend
window.onload = loadTasksFromBackend;
