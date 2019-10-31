var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

var print = (string) => console.log(string);

/* GET home page. */
router.get('/', function(req, res, next) {
    print("chegei");
    //Filmes.listar()
    //    //.then(dados => res.jsonp(dados))
    //    .then(dados => console.log(dados))
    //    .catch(erro => res.status(500).jsonp(erro))
});

//router.get('/:idFilme', function(req, res, next) {
//    Filmes.consultar(req.params.idFilme)
//        //.then(dados => res.jsonp(dados))
//        .catch(erro => res.status(500).jsonp(erro))
//})

module.exports = router;
