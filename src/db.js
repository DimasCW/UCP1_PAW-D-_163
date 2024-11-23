// src/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Ganti dengan username MySQL Anda
  password: '',  // Ganti dengan password MySQL Anda
  database: 'rumah_sakit'  // Nama database Anda
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

module.exports = db;
