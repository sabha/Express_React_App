// Set up our packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apiRoute = require('./server/route');

// Connect to our database
mongoose.connect('mongodb://sabhab1:ramanar1@ds027618.mlab.com:27618/hello_node');

app.use(express.static('build'))

// Configure body-parser
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// Set our port
var port = 8080;

// Prefix our routes with with /simple-api
app.use('/api', apiRoute);

console.log('Listening ', port);
// START THE SERVER
app.listen(port);