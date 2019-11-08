var Aluno = require("../models/alunos")

const Alunos = module.exports;

//Devolve a lista
Alunos.listar = () => {
    return Aluno
        .find()
        .sort({title: 1})
        .exec()
}

// Devolve a informação de um aluno
Alunos.consultar = fid => {
    return Aluno
        .findOne({_id: fid})
        .exec()
}


Alunos.contar = () => {
    return Aluno
        .countDocuments()
        .exec()
}

Alunos.projetar = campos => {
    return Aluno
        .find({}, campos)
        .exec()
}

Alunos.agregar = campos => {
    return Aluno
        .aggregate([{$group: {_id: "$" + campo, contador: {$sum: 1}}},
                    {$sort: {contador: -1}}])
        .exec()
}

Alunos.inserir= campos => {
    var novo = new Aluno(aluno);
    return novo.save();
}

Alunos.remover = campos => {
    return Aluno.deleteOne({_id:id});
}


