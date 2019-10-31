var Filme = require("../models/filme")

const Filmes = module.exports

Filmes.listar = () => {
    return Filme
            .find()
            .sort({title : 1})
            .exec()
}

Filmes.consultar = (fid) => {
    return Filme
            .findOne({_id : fid})
            .exec()
}


Filmes.projetar = (campos) => {
    return Filme
            .find({},campos)
            .exec()
}

Filmes.projetar = (campos) => {
    return Filme
            .find({},campos)
            .exec()
}

Filmes.agregar = (campos) => {
    return Filme
            .aggregate([{$group : {_id : "$" + campos, contador: {$sum : 1}}},
                                  {$sort : {contador : -1}}])
            .exec()
}