const express = require('express');
const router = express.Router();
const db = require('../../app'); // koneksi database

// Lihat data pasien
router.get('/', (req, res) => {
  db.query('SELECT * FROM pasien', (err, results) => {
    if (err) throw err;
    res.render('pasien/index', { pasien: results });
  });
});

// Tambah data pasien
router.get('/add', (req, res) => {
  res.render('pasien/add');
});

router.post('/add', (req, res) => {
  const { nama, umur, alamat } = req.body;
  db.query('INSERT INTO pasien (nama, umur, alamat) VALUES (?, ?, ?)', [nama, umur, alamat], (err, results) => {
    if (err) throw err;
    res.redirect('/pasien');
  });
});

// Edit data pasien
router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM pasien WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.render('pasien/edit', { pasien: results[0] });
  });
});

router.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { nama, umur, alamat } = req.body;
  db.query('UPDATE pasien SET nama = ?, umur = ?, alamat = ? WHERE id = ?', [nama, umur, alamat, id], (err, results) => {
    if (err) throw err;
    res.redirect('/pasien');
  });
});

// Hapus data pasien
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM pasien WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.redirect('/pasien');
  });
});

module.exports = router;
