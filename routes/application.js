'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');



router.param('application', function(req, res, next, id) {
    return next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    
  User.find(function(err, application){
    if(err){ return next(err); }
      console.log(application)
    res.json(application);
  });
});

router.post('/', function(req, res, next) {
    var len = req.body.length;

    for(var i=0;  i < len; i++){
        var user = new User(req.body[i]);
        
        user.save(function(err, user){
            if(err){ return next(err); }

            res.json(user);
        });
    }
});

module.exports = router;