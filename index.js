const express = require('express');
const app = express();
const port = 3000;

let todos = [];
let currentId = 1;

app.use(express.json());
const cors = require('cors');
app.use(cors());

app.get('/todos', (req, res) => {
  res.json(todos);
});

// Tek ve doğru POST endpoint
app.post('/todos', (req, res) => {
  const newTodos = req.body;

  if (!Array.isArray(newTodos)) {
    return res.status(400).json({ error: 'Expected format: Array of Todos' });
  }

  // Eğer id yoksa ekle
  todos = newTodos.map((todo) => {
    if (!todo.id) {
      todo.id = currentId++;
    }
    return todo;
  });

  res.status(200).json({ message: 'Todo list updated', todos });
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
