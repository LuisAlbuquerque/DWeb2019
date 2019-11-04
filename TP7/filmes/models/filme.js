var mongoose = require('mongoose');

var filmeSchema = new mongoose.Schema({
    title: String,
    year: Number,
    cast: Array,
    genres: Array
  });

collection = "filmesc";
module.exports = mongoose.model(collection,filmeSchema);