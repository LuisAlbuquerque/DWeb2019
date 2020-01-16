var express = require('express');
var mongoose = require('mongoose');
var API = require('../controllers/api')


var render = (res) => (ret) => ret
                            .then(dados => res.jsonp( dados ))
                            .catch(err => res.jsonp( err ));

var router = express.Router();

router.get('/api/obras', (req, res, next) => {
    if(req.query.compositor!= undefined){ 
      render (res) (API.find_by_compositor(req.query.compositor));
    }
    else{
      if(req.query.instrumento!= undefined) {
        render (res) (API.find_by_instrumento(req.query.instrumento));
      }
      else{
        render (res) (API.findall());
      }
    }
  });

router.get('/api/obras/:id', (req, res, next) => {
  render (res) (API.find_by_id(res,req.params.id));
});

router.get('/api/tipos', (req, res, next) => {
  render (res) (API.tipos(res));
});

router.get('/api/obrasQuant', (req, res, next) => {
  render (res) (API.obrasquant(res));
});


module.exports = router;
