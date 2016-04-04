'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('./logs/homecontrol.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    res.send(data.toString());
  });
});

module.exports = router;
