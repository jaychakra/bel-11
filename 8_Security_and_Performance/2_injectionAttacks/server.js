// server.js
const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = new sqlite3.Database(':memory:');

// Database initialization
db.serialize(() => {
  // Users table with sensitive information
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT,
    is_admin BOOLEAN DEFAULT 0,
    credit_card TEXT,
    api_key TEXT
  )`);

  // Blog posts table
  db.run(`CREATE TABLE blog_posts (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    title TEXT,
    content TEXT,
    is_private BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Insert sample data
  db.run(`INSERT INTO users (username, password, email, is_admin, credit_card, api_key) VALUES 
    ('admin', 'admin123', 'admin@blog.com', 1, '4532-xxxx-xxxx-9876', 'sk_live_admin_123456'),
    ('alice', 'alice123', 'alice@blog.com', 0, '4532-xxxx-xxxx-5678', 'sk_live_user_123456')`);

  db.run(`INSERT INTO blog_posts (user_id, title, content, is_private) VALUES
    (1, 'Welcome Post', 'Welcome to our blog!', 0),
    (1, 'Private Admin Notes', 'Secret admin information...', 1),
    (2, 'Alice Public Post', 'Hello everyone!', 0)`);
});


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));

// Vulnerable Routes

// 1. Login - Vulnerable to "always true" attack
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Vulnerable: Direct string concatenation
  const query = `
    SELECT id, username, is_admin, email 
    FROM users 
    WHERE username = '${username}' 
    AND password = '${password}'
  `;

  console.log(query);
  
  db.all(query, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    res.json(user);
  });
});

// 2. Add Posts - Vulnerable to query stacking
app.post('/api/posts', (req, res) => {
  // const { keyword } = req.body;
  const post = {
    id: Math.round(Math.random()*1000),
    title: req.body.title,
    content: req.body.content,
    isPrivate: false
  }
  
  console.log(req.body);
  // Vulnerable: Allows multiple queries
  
  const id = Math.round(Math.random()*1000);
  const query = `INSERT INTO blog_posts (id, title, content) VALUES (${id}, '${req.body.title}', '${req.body.content}')`;

  console.log("Executing query:", query);

  const query2 = `SELECT * FROM blog_posts`;
  db.exec(query, (err, results) => {
    console.log(results);
    if (err) return res.status(500).json({ error: err.message });

    db.all(query2, (err, posts) => {
      if (err) { return res.status(500).json({ error: err.message });}
      res.json(posts[posts.length -1] || []);
  
    });
  });
});

// 3. User Profile - Vulnerable to data exfiltration
app.get('/api/users/profile', (req, res) => {
  const { username } = req.query;
  
  // Vulnerable: Allows UNION-based attacks
  const query = `
    SELECT username, email 
    FROM users 
    WHERE username = '${username}'
  `;
  
  db.get(query, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
});

app.listen(3000, () => {
  console.log('Vulnerable server running on port 3000');
});