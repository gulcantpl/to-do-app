let tasks = [];

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderTasks();
  }
}

function removeTask(index) {
  if (index > -1 && index < tasks.length) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeTask(index);
    li.appendChild(removeButton);
    taskList.appendChild(li);
  });
}

document.getElementById('add-task-btn').onclick = function () {
  const taskInput = document.getElementById('task-input');
  addTask(taskInput.value);
  taskInput.value = '';
};

document.getElementById('clear-tasks-btn').onclick = function () {
  tasks = [];
  renderTasks();
};
