var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

//db with mongo
var configDB = require('./config/database.js');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// =============================================================================

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var port = process.env.PORT || 8080;

var router = express.Router();

app.use(express.static('./static'));

/*
app.get('/', function(req, res) {
    res.sendfile('dash4.html');
	console.log('Something is happening.');
});
*/

// middleware to use for all route requests
router.use(function(req, res, next) {
	// just to know its doing something
	console.log('Something is happening.');
	next(); //next route
});

//downloads with router
router.get('/content/:filename', function (req, res) {
	serve_static_file(req.params.filename, res);
});

// setup the routes -- first is call to raw downloads
router.get('/hello', function (req, res) {
	stream = fs.createReadStream('data/outpuData.json', {encoding: 'utf8'});
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

//get views data
router.get('/views', function (req, res) {
	stream = fs.createReadStream('data/views.json', {encoding: 'utf8'});
	stream.on('data', function(chunk) {
		return res.end(chunk);
	});
	
	//error check streams
	stream.on('error', function(err) {
	  process.stderr.write("ERROR: " + err.message + "\n");
	});
});

//helpers
function serve_static_file(file, res) {
	if (file == 'EW') {
		var csvfile = 'data/EW.csv';
		res.download(csvfile);
	} else if (file == 'sessions') {
		var csvfile = 'data/sessions.csv';
		res.download(csvfile);
	} else if (file == 'views') {
		var csvfile = 'data/views.csv';
		res.download(csvfile);
	}
}

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

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//start the server
app.listen(port);
console.log('listening on 8080');
sten(port);
console.log('listening on 8080');
