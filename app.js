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

// get all products
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

// Get single product
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

// ===== CART ROUTES ===== //

// Add item to cart
app.post('/api/cart', async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  
  if (!userId || !productId) {
    return res.status(400).json({ error: 'User ID and Product ID are required' });
  }

  try {
    // Check if item already exists in cart
    const existingItem = await db.getCartItem(userId, productId);
    
    if (existingItem) {
      // Update quantity
      await db.updateCartItemQuantity(userId, productId, existingItem.quantity + quantity);
    } else {
      // Add new item
      await db.addToCart(userId, productId, quantity);
    }
    
    res.json({ success: true, message: 'Item added to cart' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// DELETE individual cart item by cart_item_id (MOVED UP - more specific route first)
app.delete('/api/cart/item/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    await db.deleteCartItem(itemId);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Failed to delete item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Get user's cart (MOVED DOWN - less specific route after more specific ones)
app.get('/api/cart/:userId', async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const cartItems = await db.getCartByUserId(userId);
    res.json(cartItems);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Clear user's cart
app.delete('/api/cart/:userId', async (req, res) => {
  const userId = req.params.userId;
  
  try {
    await db.clearCart(userId);
    res.json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    console.error('Error clearing cart:', err);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});
  
  

// ===== START SERVER ===== //
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
