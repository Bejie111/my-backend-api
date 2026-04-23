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
	conn.query('SELECT * FROM enrollment', (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.get('/:enroll_id', (req, res) => {
	conn.query('SELECT * FROM enrollment WHERE enroll_id=?', [req.params.enroll_id], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.post('/', (req, res) => {
	const { enroll_code, enroll_date, student_id, status, amt_paid } = req.body;
	conn.query(
		'INSERT INTO enrollment(enroll_code, enroll_date, student_id, status, amt_paid) VALUES(?,?,?,?,?)',
		[enroll_code, enroll_date, student_id, status, amt_paid],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.put('/:enroll_id', (req, res) => {
	const { enroll_code, enroll_date, student_id, status, amt_paid } = req.body;
	conn.query(
		'UPDATE enrollment SET enroll_code=?, enroll_date=?, student_id=?, status=?, amt_paid=? WHERE enroll_id=?',
		[enroll_code, enroll_date, student_id, status, amt_paid, req.params.enroll_id],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.delete('/:enroll_id', (req, res) => {
	conn.query('DELETE FROM enrollment WHERE enroll_id=?', [req.params.enroll_id], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

module.exports = router;