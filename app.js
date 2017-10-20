var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var generateName = require('sillyname');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/lil-robot', {
    useMongoClient: true
  })
  .then(function() { console.log('connection successful') })
  .catch(function(err) { console.error(err) });

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

  socket.on('disconnect', function() {
    queue = queue.filter(function (t) {
      return t.id !== socket.id });
    io.sockets.emit('sendQueue', queue);
    console.log("Client disconnected.");
  });
});

setInterval(function () {
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

app.use('/users', users);

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
