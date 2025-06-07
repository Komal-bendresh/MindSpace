const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database')

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// Middlewares
app.use(cors());
app.use(express.json());

connectDB();

// check if server is running
app.get('/', (req, res) => {
  res.send('MindSpace backend is running ');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT} `);
});