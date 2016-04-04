'use strict';
var express = require('express');
var router = express.Router();


router.param('startpage', function(req, res, next, id) {
  
    return next();
});

router.get('/', function(req, res, next) {
    res.json("Hej");
});

router.post('/', function(req, res, next) {
  Timers_model.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:timer/ontime', function(req, res, next) {
  req.timer.updateOnTime(req.body, function (err, post) {
    if (err) return next(err);

    res.json(post)
  });
});

router.put('/:timer/add_schedule', function(req, res, next) {
  req.timer.addSchedule(req.body, function (err, post) {
    if (err) return next(err);

    res.json(post)
  });
});

router.delete('/:id', function(req, res, next) {
  Timers_model.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.status(200).json(post)
  });
});

router.delete('/:timer_id/:schedule_id', function(req, res, next) {
  var schedule_id = req.params.schedule_id;

  Timers_model.findByIdAndUpdate(req.params.timer_id, {$pull: {'schedules': {_id: req.params.schedule_id}}}, function (err, post) {
    if (err) return next(err);
    res.status(200).json(post)
  });
});
module.exports = router;
