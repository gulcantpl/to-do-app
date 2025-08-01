let tasks = [];

function addTask(taskText) {
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    renderTasks();
  }
}

function removeTask(index) {
  if (index > -1 && index < tasks.length) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.gap = '8px';
    li.style.marginBottom = '8px';

    // Tik kutusu
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleComplete(index));

    // Görev metni
    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add('completed');
    }

    // Silme butonu
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-regular fa-square-minus"></i>';
    removeButton.onclick = () => removeTask(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeButton);
    taskList.appendChild(li);
  });
}

document.getElementById('add-task-btn').onclick = function () {
  const taskInput = document.getElementById('task-input');
  addTask(taskInput.value.trim());
  taskInput.value = '';
};

document.getElementById('clear-tasks-btn').onclick = function () {
  tasks = [];
  renderTasks();
};
