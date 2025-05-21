const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
const PORT = 3000;

// middleware to parse JSON and forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// ===== ROUTES ===== //

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
const bcrypt = require('bcrypt');

// Register/Signup
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.createUser(name, email, hashedPassword);
    res.status(201).json({ id: newUser.id, name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const product = await db.getProductById(id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (err) {
      console.error("Error fetching product:", err);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
  

// ===== START SERVER ===== //
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
