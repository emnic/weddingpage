'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Excel = require('exceljs');
var fs = require('fs');

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

    app.get('/admin/applications/excel', function(req, res, next) {
    	var applications = [];
      	User.find({}, 'applications', function(err, application){
        	if(err){ return next(err); }

        	for (var i = 0; i < application.length; ++i){
        		for (var j = 0; j < application[i].applications.length; ++j){
        			applications.push(application[i].applications[j]);
        		}
        	}

        	createExcelFile(applications);
        	
        	res.json("File created")
      	});
    });
    function createExcelFile(applications) {
    	var workbook = new Excel.Workbook();

    	var statistics = workbook.addWorksheet('Sammanställning');
        var stats = _stats(applications);

        statistics.columns = [
            { header: 'Antal Svar', key: 'num_total', width: 16 },
            { header: 'Antal Ja', key: 'num_yes', width: 16 },
            { header: 'Antal Nej', key: 'num_no', width: 16 },
            { header: 'Antal Transfer', key: 'num_transfer', width: 16 },
            { header: 'Laktosallergi', key: 'num_laktos', width: 16 },
            { header: 'Glutenallergi', key: 'num_glukose', width: 16 },
            { header: 'Nötallergi', key: 'num_nuts', width: 16 },
            { header: 'Vegetariskt', key: 'num_vegetarian', width: 32 },
            { header: 'Allergi', key: 'num_other', width: 16 },
        ];
        statistics.getRow(1).font = { bold: true };
        statistics.addRow(stats);

        var participants = workbook.addWorksheet('Deltagare');

    	participants.columns = [
		    { header: 'Förnamn', key: 'firstname', width: 32 },
		    { header: 'Efternamn', key: 'lastname', width: 32 },
		    { header: 'Epost', key: 'email', width: 32 },
		    { header: 'Deltager', key: 'attend', width: 32 },
		    { header: 'Transfer', key: 'transfer', width: 32 },
		    { header: 'Specialkost', key: 'special_food', width: 32 },
		    { header: 'Meddelande', key: 'message', width: 32 },
		];

		participants.getRow(1).font = { bold: true };
		
		var max_rows = applications.length;
		var max_cols = 8;
		
		// Fill in the data 
		for (var row = 0; row < max_rows; row++){
			
			var app = applications[row]
			/*
			participants.addRow({
				firstname: app.firstname, 
				lastname: app.lastname, 
				email: 'app.email',
				attend: app.attend?'Ja':'Nej',
				transfer: app.transfer?'Ja':'Nej',
				special_food: app.special_food===''?foodToStr(app.special_food):'e',
				message: app.notes===''?app.notes:'e'
			});*/
			var food = foodToStr(app.special_food);

			participants.addRow([
				(app.firstname === '')?' ':app.firstname,
				(app.lastname === '')?' ':app.lastname,
				(app.email === '')?' ':app.email,
				app.attend?'Ja':'Nej',
				app.transfer?'Ja':'Nej',
				(food === '')?' ':food,
				(app.notes === '')?' ':app.notes
				]);
		 }
		
		workbook.xlsx.writeFile('./gen_files/Deltagarlista.xlsx')
    		.then(function() {
        		console.log('File saved'); 
    		});
    }
    function foodToStr(special_food) {

        var food_str = '';

        if (special_food.laktos)
            food_str = 'Laktos';
        if (special_food.glukose)
            food_str != ''?food_str += ', Gluten':food_str += 'Gluten';
        if (special_food.nuts)
            food_str != ''?food_str += ', Nötter':food_str += 'Nötter';    
        if (special_food.vegetarian)
            food_str != ''?food_str += ', Vegetarisk':food_str += 'Vegetarisk';    
        if (special_food.other)
            food_str != ''?food_str += ', ' + special_food.other:food_str += special_food.other;

        return food_str;
    };

    function _stats(applications) {

            var _num_yes        = 0;
            var _num_no         = 0;
            var _num_transfer   = 0;
            var _num_laktos     = 0;
            var _num_glukose    = 0;
            var _num_nuts       = 0;
            var _num_vegetarian = 0;
            var _num_other      = 0;

            for (var attendee in applications){         
                if (applications[attendee].attend){
                    _num_yes += 1;

                    if (applications[attendee].transfer)
                        _num_transfer += 1;
                    if (applications[attendee].special_food.laktos)
                        _num_laktos += 1;
                    if (applications[attendee].special_food.glukose)
                        _num_glukose += 1;
                    if (applications[attendee].special_food.nuts)
                        _num_nuts += 1;
                    if (applications[attendee].special_food.vegetarian)
                        _num_vegetarian += 1;
                    if (applications[attendee].special_food.other)
                        _num_other += 1;                                
                }       
                if (!applications[attendee].attend)
                    _num_no += 1;
            }

            var data = {num_total:      _num_yes  + _num_no,
                        num_yes:        _num_yes,
                        num_no:         _num_no,
                        num_transfer:   _num_transfer,
                        num_laktos:     _num_laktos,
                        num_glukose:    _num_glukose,
                        num_nuts:       _num_nuts,
                        num_vegetarian: _num_vegetarian,
                        num_other:      _num_other
            }

            return data
        };
}