const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const mainRoutes = require('./routes/main');

// Use routes
app.use('/', mainRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});