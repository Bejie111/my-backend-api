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
	conn.query('SELECT * FROM course', (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.get('/:course_id', (req, res) => {
	conn.query('SELECT * FROM course WHERE course_id=?', [req.params.course_id], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.post('/', (req, res) => {
	const { course_id, course_code, course_desc } = req.body;
	conn.query(
		'INSERT INTO course(course_id, course_code, course_desc) VALUES(?,?,?)',
		[course_id, course_code, course_desc],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.put('/:course_id', (req, res) => {
	const { course_code, course_desc } = req.body;
	conn.query(
		'UPDATE course SET course_code=?, course_desc=? WHERE course_id=?',
		[course_code, course_desc, req.params.course_id],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.delete('/:course_id', (req, res) => {
	conn.query('DELETE FROM course WHERE course_id=?', [req.params.course_id], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

module.exports = router;