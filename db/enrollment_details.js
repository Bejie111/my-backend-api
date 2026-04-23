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
	conn.query('SELECT * FROM enrollment_details', (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.get('/:enroll_detail_id', (req, res) => {
	conn.query('SELECT * FROM enrollment_details WHERE enroll_detail_id=?', [req.params.enroll_detail_id], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.post('/', (req, res) => {
	const { enroll_id, suboffid } = req.body;
	conn.query(
		'INSERT INTO enrollment_details(enroll_id, suboffid) VALUES(?,?)',
		[enroll_id, suboffid],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.put('/:enroll_detail_id', (req, res) => {
	const { enroll_id, suboffid } = req.body;
	conn.query(
		'UPDATE enrollment_details SET enroll_id=?, suboffid=? WHERE enroll_detail_id=?',
		[enroll_id, suboffid, req.params.enroll_detail_id],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.delete('/:enroll_detail_id', (req, res) => {
	conn.query('DELETE FROM enrollment_details WHERE enroll_detail_id=?', [req.params.enroll_detail_id], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

module.exports = router;