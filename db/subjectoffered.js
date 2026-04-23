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
	conn.query('SELECT * FROM subjectoffered', (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.get('/:suboffid', (req, res) => {
	conn.query('SELECT * FROM subjectoffered WHERE suboffid=?', [req.params.suboffid], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

router.post('/', (req, res) => {
	const { edpcode, subjid, start_time, end_time, days, room, teacherid } = req.body;
	conn.query(
		'INSERT INTO subjectoffered(edpcode, subjid, start_time, end_time, days, room, teacherid) VALUES(?,?,?,?,?,?,?)',
		[edpcode, subjid, start_time, end_time, days, room, teacherid],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.put('/:suboffid', (req, res) => {
	const { edpcode, subjid, start_time, end_time, days, room, teacherid } = req.body;
	conn.query(
		'UPDATE subjectoffered SET edpcode=?, subjid=?, start_time=?, end_time=?, days=?, room=?, teacherid=? WHERE suboffid=?',
		[edpcode, subjid, start_time, end_time, days, room, teacherid, req.params.suboffid],
		(err, rows) => {
			if (err) return res.status(500).json(err);
			return res.json(rows);
		}
	);
});

router.delete('/:suboffid', (req, res) => {
	conn.query('DELETE FROM subjectoffered WHERE suboffid=?', [req.params.suboffid], (err, rows) => {
		if (err) return res.status(500).json(err);
		return res.json(rows);
	});
});

module.exports = router;