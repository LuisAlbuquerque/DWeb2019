var API = require('../models/nobel');
var mongoose = require('mongoose');

const APIs = module.exports;
var print = (string) => console.log(string);


APIs.findall = (res) => {
  return API
        .find({},{id:1,titulo:1,tipo:1,compositor:1})
        .sort()
        .exec();
}

APIs.find_by_id = (res,id) => {
  console.log(id);
  return API
          .find({id : id})
          .exec();
}

APIs.find_by_compositor = (nome) => {
  return API
          .find({compositor: nome})
          .exec();
}

APIs.find_by_instrumento = (designacao) => {
  return API
    .aggregate([
      {$unwind : "$instrumentos"},
      {$match : {"instrumentos.designacao" : designacao}},
      {$group : {_id : "$instrumentos.designacao", 
                 obras : {$push : "$titulo"}
                }
              }
       ])
    .exec();
}

APIs.tipos = (res) => {
  return API
    .find()
    .distinct('tipo')
    .exec()
}

APIs.obrasquant= (res) => {
  return API
    .aggregate([
      {$unwind : "$instrumentos"},
      {$group : {
          _id : "$id",
          titulo : {$first : "$titulo"},
          partitura : {$sum : 1}
        }
      }
    ])
    .exec()
}
