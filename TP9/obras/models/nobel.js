var mongoose = require('mongoose');

var obrasSchema = new mongoose.Schema({
    _id: String,
    nome: String,
    desc: String,
    anoCriacao: String,
    periodo: String,
    compositor: String,
    duracao: String,
  });

collection = "obra";
module.exports = mongoose.model(collection,obrasSchema);