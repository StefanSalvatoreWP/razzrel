const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import the cors package
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const jwt = require('jsonwebtoken'); // You'll need to install this package
const bcrypt = require('bcrypt'); // You'll need to install this package

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'limitless'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Secret key for JWT
const JWT_SECRET = 'arias123'; // Change this to a secure random string

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
};

// Middleware to check if user is authenticated
const isUser = (req, res, next) => {
  if (!req.user) return res.status(403).json({ message: "No user authenticated" });
  next();
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: "Require Admin Role!" });
  next();
};

// Public Routes
app.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, contactNo, termsAccepted } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (role, fullName, email, password, contactNo, termsAccepted) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, ['user', fullName, email, hashedPassword, contactNo, termsAccepted], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ success: false, message: 'Email already exists' });
        } else {
          res.status(500).json({ success: false, message: 'Database error' });
        }
        return;
      }
      res.json({ success: true, message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'An error occurred during registration' });
  }
});

app.post('/login', (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  console.log('Executing query:', query, 'with email:', email);
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ message: "Error on the server." });
      return;
    }
    console.log('Query results:', results);
    if (results.length === 0) {
      console.log('User not found:', email);
      res.status(404).json({ message: "User not found." });
      return;
    }
    const user = results[0];
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      console.log('Invalid password for user:', email);
      res.status(401).json({ message: "Invalid password!" });
      return;
    }
    const token = jwt.sign(
      { 
        id: user.id, 
        fullName: user.fullName, 
        email: user.email, 
        role: user.role 
      }, 
      JWT_SECRET, 
      { expiresIn: 86400 } // 24 hours
    );
    console.log('Login successful for user:', email);
    res.status(200).json({ 
      auth: true, 
      token: token, 
      user: { 
        id: user.id, 
        fullName: user.fullName, 
        email: user.email, 
        role: user.role 
      } 
    });
  });
});

// Private Routes
app.get('/user/profile', verifyToken, isUser, (req, res) => {
  res.status(200).json(req.user);
});

app.get('/admin/users', verifyToken, isAdmin, (req, res) => {
  const query = 'SELECT id, fullName, email, role FROM users';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error on the server." });
      return;
    }
    res.status(200).json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
