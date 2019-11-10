var mongoose = require('mongoose');

var laureatesSchema = new mongoose.Schema({
    firstname: String,
    surname: Number,
    motivation: String,
    share: Number,
  });

var filmeSchema = new mongoose.Schema({
    year: String,
    category: String,
    laureates: [ laureatesSchema ],
  });

collection = "prize";
module.exports = mongoose.model(collection,filmeSchema);