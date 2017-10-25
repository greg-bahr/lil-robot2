var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var generateName = require('sillyname');

// var makePwm = require('adafruit-pca9685');
// var pwm = makePwm({ freq: 50, correctionFactor: 1.118 });

http.listen(3001);

var queue = [];
var timer = 15;

io.on('connection', function (socket) {
  console.log("Client connected.");

  queue.push({
    name: generateName(),
    id: socket.id
  });
  io.sockets.emit('sendQueue', queue);
  io.sockets.emit('timer', timer);

  socket.on('buttonPressed', function(button) {
    if(queue[0] && queue[0].id === socket.id) {
      /*switch (button) {
        case "ArrowUp":
          pwm.setPulse(0, 2000);
          pwm.setPulse(1, 1000);
          break;
        case "ArrowLeft":
          pwm.setPulse(0, 1000);
          pwm.setPulse(1, 1000);
          break;
        case "ArrowDown":
          pwm.setPulse(0, 1000);
          pwm.setPulse(1, 2000);
          break;
        case "ArrowRight":
          pwm.setPulse(0, 2000);
          pwm.setPulse(1, 2000);
          break;
        default:
          pwm.setPulse(0, 0);
          pwm.setPulse(1, 0);
          break;
      }*/
    }
  });

  socket.on('newName', function (name) {
    var index = queue.findIndex(function (obj) {
      return obj.id === socket.id;
    });
    queue[index].name = name;

    io.sockets.emit('sendQueue', queue);
  });

  socket.on('disconnect', function() {
    queue = queue.filter(function (t) {
      return t.id !== socket.id });
    io.sockets.emit('sendQueue', queue);
    console.log("Client disconnected.");
  });
});

setInterval(function () {
  /*pwm.setPulse(0, 0);
  pwm.setPulse(1, 0);*/
  queue.push(queue.shift());
  timer = 15;
  io.sockets.emit('sendQueue', queue);
  io.sockets.emit('timer', timer);
}, 15000);

setInterval(function () {
  timer--;
}, 1000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
