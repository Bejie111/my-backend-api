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
	conn.query('SELECT * FROM subjects', (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.get('/:subjid', (req, res) => {
	conn.query('SELECT * FROM subjects WHERE subjid=?', [req.params.subjid], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.post('/', (req, res) => {
	const { subjid, subjcode, subjdesc, units } = req.body;

	// If subjid is provided manually, include it; otherwise let MySQL auto-increment
	if (subjid !== undefined && subjid !== null && subjid !== '') {
		conn.query(
			'INSERT INTO subjects(subjid, subjcode, subjdesc, units) VALUES(?,?,?,?)',
			[subjid, subjcode, subjdesc, units],
			(err, rows) => {
				if (err) return res.status(500).json(err);
				return res.json(rows);
			}
		);
	} else {
		conn.query(
			'INSERT INTO subjects(subjcode, subjdesc, units) VALUES(?,?,?)',
			[subjcode, subjdesc, units],
			(err, rows) => {
				if (err) return res.status(500).json(err);
				return res.json(rows);
			}
		);
	}
});

router.put('/:subjid', (req, res) => {
	const { subjcode, subjdesc, units } = req.body;
	conn.query(
		'UPDATE subjects SET subjcode=?, subjdesc=?, units=? WHERE subjid=?',
		[subjcode, subjdesc, units, req.params.subjid],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.delete('/:subjid', (req, res) => {
	conn.query('DELETE FROM subjects WHERE subjid=?', [req.params.subjid], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

module.exports = router;