const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200
}));

const TODO_FILE = path.join(__dirname, 'todos.json');
const PROJECT_FILE = path.join(__dirname, 'project.json');

// Todoの一覧取得
app.get('/todos', (req, res) => {
  const todos = fs.existsSync(TODO_FILE) ? JSON.parse(fs.readFileSync(TODO_FILE)) : [];
  res.json(todos);
});

// project_idを指定して該当するTodoを取得
app.get('/todos/project/:project_id', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(TODO_FILE));
  const filteredTodos = todos.filter(todo => todo.project_id == req.params.project_id);
  res.json(filteredTodos);
});

// Todoの追加
app.post('/todos', (req, res) => {
  const todos = fs.existsSync(TODO_FILE) ? JSON.parse(fs.readFileSync(TODO_FILE)) : [];
  const newTodo = { id: todos.length + 1, ...req.body };
  todos.push(newTodo);
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
  res.json(newTodo);
});

// idを指定してTodoの更新
app.put('/todos/:id', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(TODO_FILE));
  const todoIndex = todos.findIndex(todo => todo.id == req.params.id);
  if (todoIndex >= 0) {
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
    res.json(todos[todoIndex]);
  } else {
    res.status(404).send('Todo not found');
  }
});

// idを指定してTodoの削除
app.delete('/todos/:id', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(TODO_FILE));
  const updatedTodos = todos.filter(todo => todo.id != req.params.id);
  fs.writeFileSync(TODO_FILE, JSON.stringify(updatedTodos, null, 2));
  res.json({ message: 'Todo deleted' });
});

// プロジェクトの一覧を取得
app.get('/projects', (req, res) => {
  const projects = JSON.parse(fs.readFileSync(PROJECT_FILE));
  res.json(projects);
});

// プロジェクトの追加
app.post('/projects', (req, res) => {
  const projects = fs.existsSync(PROJECT_FILE) ? JSON.parse(fs.readFileSync(PROJECT_FILE)) : [];
  const newProject = { id: projects.length + 1, ...req.body };
  projects.push(newProject);
  fs.writeFileSync(PROJECT_FILE, JSON.stringify(projects, null, 2));
  res.json(newProject);
});

// プロジェクトの更新
app.put('/projects/:id', (req, res) => {
  const projects = JSON.parse(fs.readFileSync(PROJECT_FILE));
  const projectIndex = projects.findIndex(p => p.id == req.params.id);
  if (projectIndex >= 0) {
    projects[projectIndex] = { ...projects[projectIndex], ...req.body };
    fs.writeFileSync(PROJECT_FILE, JSON.stringify(projects, null, 2));
    res.json(projects[projectIndex]);
  } else {
    res.status(404).send('Project not found');
  }
});

// サーバーを起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
