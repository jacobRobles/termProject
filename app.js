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

// routes //

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

// register signup
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

// login
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
  // hmm dont think this following part is working, try to fix later, not priority...trying to fix the .html showing in url
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
  });
  
  app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
  });
  
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });
  
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
  });
  
  app.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'faq.html'));
  });
  
  app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'payment.html'));
  });
  
  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
  });
  
  app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
  });
  

// ===== START SERVER ===== //
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
