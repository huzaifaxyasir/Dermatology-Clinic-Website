const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// Serve static files (HTML, JS, CSS) from root folder
app.use(express.static(__dirname));

// === DATABASE SETUP ===
const db = new sqlite3.Database("./db/skinz.db", (err) => {
  if (err) {
    console.error("❌ Failed to connect to DB:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// Create appointments table
db.run(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    date TEXT,
    phone TEXT
  )
`);

// Create admins table (optional if hardcoding)
db.run(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )
`);

// === API ROUTES ===

// POST /api/appointments - Book appointment
app.post("/api/appointments", (req, res) => {
  const { name, email, date, phone } = req.body;

  const sql = `INSERT INTO appointments (name, email, date, phone) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, email, date, phone], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.json({ success: true, id: this.lastID });
  });
});

// GET /api/appointments - Fetch all appointments (for admin dashboard)
app.get("/api/appointments", (req, res) => {
  const sql = `SELECT * FROM appointments ORDER BY id DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
});

// POST /api/auth/login - Admin login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  const ADMIN_USERNAME = "chaand";
  const ADMIN_PASSWORD = "354061";

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// DELETE /api/appointments/:id - Delete appointment by ID
app.delete("/api/appointments/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM appointments WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ message: err.message });

    res.json({ success: true });
  });
});


// === START SERVER ===
app.listen(port, () => {
  console.log(`🌐 Server running at: http://localhost:${port}`);
});
