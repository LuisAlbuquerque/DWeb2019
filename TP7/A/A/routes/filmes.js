var express = require("express")

var router = express.Router()

router.get("/", (req,res) => {
    Filmes.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))

})