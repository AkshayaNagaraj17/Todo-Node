
// Import the Express module
const express = require('express');

// Create an instance of an Express app
const app = express();

// Define a port
const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World! This is a simple Express.js app.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
