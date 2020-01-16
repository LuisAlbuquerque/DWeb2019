var express = require('express');
var mongoose = require('mongoose');
var Filmes = require('../controllers/nobels')
var axios = require("axios")

var link = (type,query) =>  "http://clav-api.dglab.gov.pt/api/"+type+"/"+query+"?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ" 

var api_get = (type,url) => (res )=> (result) => {
    axios.get(link(type,url))
    .then(dados => {
      result(dados);
    })
    .catch(erro => {
      res.render("error", {error : erro});
    })
  }


var api_post = (url) => (result) => (object) => {
  axios.post("http://localhost:3000/api/" + url, object)
    .then(dados => {
      result(dados)
    })
    .catch(erro => {
      res.render("erro", {error : erro});
    })
  }

var api_put = (url) => (result) => (object) => {
  axios.put("http://localhost:3000/api/" + url, object)
    .then(dados => {
      result(dados)
    })
    .catch(erro => {
      res.render("erro", {error : erro});
    })
  }


var router = express.Router();

router.get('/tipologias/:id', (req, res, next) => {
  var id = req.params.id;
  api_get ("tipologias","/" + req.params.id)(res) (
    dados => {

      api_get ("tipologias",id +"/elementos")(res) (
        elementos => {
          api_get ("tipologias","/" + req.params.id +"/intervencao/dono")(res) (
              donos=>{
                api_get ("tipologias","/" + req.params.id +"/intervencao/participante")(res) (
                  participante =>
                    res.render("tipologia",{DATA: dados.data,
                                      id: req.params.id,
                                      ELEMENTOS : elementos.data,
                                      DONOS : donos.data,
                                      PARTICIPANTE : participante.data
                                    })
                 )}
          )
        }
      )
    }
    );
});

/* GET home page. */
router.get('/', (req, res, next) => {
  api_get ("entidades","") (res) (dados => res.render("index",{DATA: dados.data}));
});

router.get('/:id', (req, res, next) => {
  api_get ("entidades","/" + req.params.id)(res) (
    entidades =>{
      api_get ("entidades","/" + req.params.id + "/tipologias")(res) (
        tipologias =>{
          api_get ("entidades","/" + req.params.id + "/intervencao/dono")(res) (
            donos =>{
              api_get ("entidades","/" + req.params.id + "/intervencao/participante")(res) (
                participante => {
                    res.render("entidades",{ENTIDADES: entidades.data,
                                      id: req.params.id,
                                      TIPOLOGIAS: tipologias.data,
                                      DONOS : donos.data,
                                      PARTICIPANTE : participante.data
                                    })
                    }
        )
       }
      )
    }

  )

  })
});




module.exports = router;
