var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  href : String
});

var infRechema = new mongoose.Schema({
  video : videoSchema
});

var partituraSchema = new mongoose.Schema({
  clave : String,
  afinacao : String,
  path : String,
  voz : String
});

var instrumentoSchema = new mongoose.Schema({
  designacao : String,
  partitura : partituraSchema
});

var APISchema = new mongoose.Schema({
    id: String,
    titulo: String,
    subtitulo: String,
    aranjo: String,
    tipo: String,
    compositor: String,

    "inf-relacionada": infRechema,
    instrumentos: [instrumentoSchema],
  });

collection = "obras";
module.exports = mongoose.model(collection,APISchema);