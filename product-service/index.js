const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const DB_FILE = './products.json';

function readProducts() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveProducts(products) {
  fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2));
}

app.get('/products', (req, res) => {
  res.json(readProducts());
});

app.post('/products', (req, res) => {
  const products = readProducts();
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
});

app.listen(3002, () => {
  console.log('Product Service running on port 3002');
});