require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const conn = mysql.createPool({
	host:            process.env.HOSTNAME,
	user:            process.env.USER,
	password:        process.env.PASSWORD,
	database:        process.env.DATABASE,
	connectionLimit: 10,
});

router.get('/', (req, res) => {
	conn.query('SELECT * FROM students', (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.get('/:idno', (req, res) => {
	conn.query('SELECT * FROM students WHERE idno=?', [req.params.idno], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.post('/', (req, res) => {
	const { idno, lastname, firstname, course_id, level } = req.body;
	conn.query(
		'INSERT INTO students(idno, lastname, firstname, course_id, level) VALUES(?,?,?,?,?)',
		[idno, lastname, firstname, course_id, level],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.put('/:idno', (req, res) => {
	const { lastname, firstname, course_id, level } = req.body;
	conn.query(
		'UPDATE students SET lastname=?, firstname=?, course_id=?, level=? WHERE idno=?',
		[lastname, firstname, course_id, level, req.params.idno],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.delete('/:idno', (req, res) => {
	conn.query('DELETE FROM students WHERE idno=?', [req.params.idno], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

module.exports = router;
