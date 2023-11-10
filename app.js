const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'dbu234',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.message);
  } else {
    console.log('Connected to the database');
  }
});

// Create a table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    business_name VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255)
  )
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table: ' + err.message);
  } else {
    console.log('Table created (or already exists)');
  }
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, business_name, phone_number, email } = req.body;

  const insertQuery = `
    INSERT INTO users (name, business_name, phone_number, email)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertQuery, [name, business_name, phone_number, email], (err) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).json({ error: 'Error saving data' });
    } else {
      console.log('Data saved to the database');
      res.status(200).redirect('http://localhost:3000//thankYou');
    }
  });
});

// Start the Express.js server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
