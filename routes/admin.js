'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var nodemailer = require('nodemailer');

module.exports = function(app, auth){

    /* GET users listing. */
    app.get('/admin/applications', function(req, res, next) {
    	var applications = [];
      	User.find({}, 'applications', function(err, application){
        	if(err){ return next(err); }

        	for (var i = 0; i < application.length; ++i){
        		for (var j = 0; j < application[i].applications.length; ++j){
        			applications.push(application[i].applications[j]);
        		}
        	}

        	res.json(applications);
      	});
    });
}