'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');

module.exports = function(app, auth){
	/* GET users listing. */
	app.get('/party', auth, function(req, res, next) {
	});
}
