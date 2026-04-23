require('dotenv').config();
const port = process.env.PORT || 5000
const express = require('express');
const cors = require('cors');

const students           = require("./db/students");
const course             = require("./db/course");
const subjects           = require("./db/Subjects");
const teachers           = require("./db/teachers");
const subjectoffered     = require("./db/subjectoffered");
const enrollment         = require("./db/enrollment");
const enrollment_details = require("./db/enrollment_details");

const app = express();
app.use(cors()); 
app.use(express.urlencoded({'extended':false}));
app.use(express.json());

app.use('/students',           students);
app.use('/course',             course);
app.use('/subjects',           subjects);
app.use('/teachers',           teachers);
app.use('/subjectoffered',     subjectoffered);
app.use('/enrollment',         enrollment);
app.use('/enrollment_details', enrollment_details);

app.get("/",(req,res)=>{
	return res.json('hello world')
});

const server = app.listen(port,()=>{
	require('dns').lookup(require('os').hostname(),(err,addr,fam)=>{
		console.log(`listening at http://${addr}:${port}`);
	});
});
