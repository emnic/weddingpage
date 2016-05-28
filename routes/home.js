'use strict';
var express = require('express');
var router = express.Router();

module.exports = function(app){
	/* GET home page. */
	app.get('/', function(req, res, next) {
		console.log('####hulabalula')
	  res.render('index', { title: 'Express' });
	});
}
