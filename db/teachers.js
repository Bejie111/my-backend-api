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
	conn.query('SELECT * FROM teachers', (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.get('/:teacherid', (req, res) => {
	conn.query('SELECT * FROM teachers WHERE teacherid=?', [req.params.teacherid], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.post('/', (req, res) => {
	const { teachercode, rfid, lastname, firstname, deptid } = req.body;
	conn.query(
		'INSERT INTO teachers(teachercode, rfid, lastname, firstname, deptid) VALUES(?,?,?,?,?)',
		[teachercode, rfid, lastname, firstname, deptid],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.put('/:teacherid', (req, res) => {
	const { teachercode, rfid, lastname, firstname, deptid } = req.body;
	conn.query(
		'UPDATE teachers SET teachercode=?, rfid=?, lastname=?, firstname=?, deptid=? WHERE teacherid=?',
		[teachercode, rfid, lastname, firstname, deptid, req.params.teacherid],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.delete('/:teacherid', (req, res) => {
	conn.query('DELETE FROM teachers WHERE teacherid=?', [req.params.teacherid], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

module.exports = router;