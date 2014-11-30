var mongoose = require('mongoose');

var datesSchema = new mongoose.Schema({
  date: String,
  year: Number,
  month: Number,
  count: Number
});





module.exports = mongoose.model('Dates', datesSchema);
