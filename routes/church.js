'use strict';
var express = require('express');
var router = express.Router();



router.param('church', function(req, res, next, id) {
    return next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json("Hej")
});

router.post('/', function(req, res, next) {

  //req.body.hw_data.id  = device_switch.addDevice()
  Devices_model.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:device', function(req, res, next) {
  Devices_model.findByIdAndUpdate(req.params.device, {$set: {hw_data: req.body.hw_data}}, function (err, post) {
    if (err) return next(err);
    res.json(post)
  });
});

router.put('/:device/state', function(req, res, next) {
  device_switch.on_off(req.body)
  req.device.changeState(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post)
  });
});

router.delete('/:id', function(req, res, next) {

  Devices_model.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) return next(err);
    res.status(200).json(data)
    device_switch.removeDevice(data)
  });
});

module.exports = router;
