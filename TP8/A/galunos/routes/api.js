var express = require('express');
var router = express.Router();

var Alunos = require("../controllers/alunos")
/* GET home page. */
router.get('/alunos', (req, res, next) => {
  Alunos.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/alunos/:id', (req, res, next) => {
  Alunos.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.post('/alunos', (req, res, next) => {
  Alunos.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/alunos/:id', (req, res, next) => {
  Alunos.remover(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.put('/alunos', (req, res, next) => {
  Alunos.alterar(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
