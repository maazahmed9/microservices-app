const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const DB_FILE = './users.json';

function readUsers() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveUsers(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

app.get('/users', (req, res) => {
  res.json(readUsers());
});

app.post('/users', (req, res) => {
  const users = readUsers();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
});

app.listen(3001, () => {
  console.log('User Service running on port 3001');
});