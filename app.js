const express = require('express');
const app = express();
const path = require('path');
const mainRoutes = require('./routes/main'); // new main router


// Serve static files (like CSS/images) from public folder
app.use(express.static('public'));

app.use('/', mainRoutes); // handles all routes in one file

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
