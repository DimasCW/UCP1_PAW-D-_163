// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./src/db');  // Import koneksi database

const app = express();

// Set view engine ke EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware untuk parsing request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'src/public')));

// Route untuk menampilkan data pasien
app.get('/', (req, res) => {
  const sql = "SELECT * FROM pasien";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render('index', { pasien: result });  // Mengirim data pasien ke view
  });
});

// Route untuk menambah pasien
app.get('/pasien/tambah', (req, res) => {
  res.render('pasien/add');
});

app.post('/pasien/tambah', (req, res) => {
  const { nama, umur, alamat } = req.body;
  const sql = "INSERT INTO pasien (nama, umur, alamat) VALUES (?, ?, ?)";
  db.query(sql, [nama, umur, alamat], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Route untuk mengedit pasien
app.get('/pasien/edit/:id', (req, res) => {
  const sql = "SELECT * FROM pasien WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.render('pasien/edit', { pasien: result[0] });
  });
});

app.post('/pasien/edit/:id', (req, res) => {
  const { nama, umur, alamat } = req.body;
  const sql = "UPDATE pasien SET nama = ?, umur = ?, alamat = ? WHERE id = ?";
  db.query(sql, [nama, umur, alamat, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Route untuk menghapus pasien
app.get('/pasien/hapus/:id', (req, res) => {
  const sql = "DELETE FROM pasien WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Menjalankan server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
