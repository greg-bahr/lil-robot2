var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  id: String,
  placeInQueue: Number
});

module.exports = mongoose.model('User', UserSchema);
