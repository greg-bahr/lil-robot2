var express = require('express');
var router = express.Router();
var User = require('../models/User');
var io = require('../app').socketServer;

io.on('connection', function (socket) {
  socket.on('disconnect', function () {
    User.findOneAndRemove({ id: socket.id }, function (err) {
      if(err) {
        console.log(err);
        return;
      }
      console.log(socket.id + " removed.")
    })
  });
});

router.get('/:user', function(req, res, next) {
  User.find({ id: req.params.user }, function (err, user) {
    if (err) return next(err);

    res.json(user);
  });
});

router.post('/user', function (req, res, next) {
  User.create(req.body, function (err, user) {
    if(err) return next(err);

    res.json(user);
  });
});


module.exports = router;
