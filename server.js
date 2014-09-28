var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var port = process.env.PORT || 8080;

var router = express.Router();

app.use(express.static('./static'));

app.get('/', function(req, res) {
    res.sendfile('dash4.html');
	console.log('Something is happening.');
});

// middleware to use for all route requests
router.use(function(req, res, next) {
	// just to know its doing something
	console.log('Something is happening.');
	next(); //next route
});

// setup the routes -- first is call to raw downloads
router.get('/hello', function (req, res) {
	stream = fs.createReadStream('outpuData.json', {encoding: 'utf8'});
	stream.on('data', function(chunk) {
		//serve_chunks(chunk, res);
		return res.end(chunk);
	});
	
	//error check streams
	stream.on('error', function(err) {
	  process.stderr.write("ERROR: " + err.message + "\n");
	});
});

//get sessions data
router.get('/sessions', function (req, res) {
	stream = fs.createReadStream('data/sessions.json', {encoding: 'utf8'});
	stream.on('data', function(chunk) {
		return res.end(chunk);
	});
	
	//error check streams
	stream.on('error', function(err) {
	  process.stderr.write("ERROR: " + err.message + "\n");
	});
});

//helpers
/*
function serve_chunks(file, res) {
	var x = JSON.parse(file);
	JSON.stringify(x);
	Object.keys(x).forEach(function (key) {
		delete x[key].Daily_Total;
	});
	
	return res.json(x);  
}
*/

//use router
app.use(router);
//start the server
app.listen(port);
console.log('listening on 8080');
