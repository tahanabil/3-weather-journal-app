/** @format */
const port = process.env.PORT || 3000;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));

// Setup Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/all', (req, res) => {
  res.send(projectData);
});

app.post('/add', (req, res) => {
  projectData = { ...req.body };
  res.send(projectData);
});
