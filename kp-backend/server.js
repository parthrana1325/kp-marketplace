require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const { createClient } = require("@supabase/supabase-js");

const app = express();
console.log("SUPABASE URL:", process.env.SUPABASE_URL);
console.log("SUPABASE KEY:", process.env.SUPABASE_ANON_KEY);
// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Error:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

console.log("Supabase Client initialized successfully!");

// Routes
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// Server (ONLY ONCE)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});