var mongoose = require("mongoose");

var notaSchema = new mongoose.Schema({
    indicador: String,
    nota : Number
  });

var alunoSchemea = new mongoose.Schema({
    _id : String,
    nome: String,
    curso : String,
    notas : [notaSchema]
  });

collection = "aluno";
module.exports = mongoose.model(collection,alunoSchemea);
