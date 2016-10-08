var express = require('express');
var app = express();

var mysql      = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'online_exam'
});


var path= require("path");
app.use('/static', express.static(__dirname + '/online_exam'));


var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/categories', function (req, res) {

	pool.query('SELECT * FROM category', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
	});
});


app.post('/api/categories', function (req, res) {
	console.log(req.body.id);

	pool.query('insert into category SET ?',[req.body], function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
