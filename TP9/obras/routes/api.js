var express = require('express');
var mongoose = require('mongoose');
var Obras = require('../controllers/api')


var render = (res) => (ret) => ret
                            .then(dados => res.jsonp( dados ))
                            .catch(err => res.jsonp( err ));

var router = express.Router();

/* GET home page. */
router.get('/obras', (req, res, next) => {
  Obras.print("Chegeou o get /");
  if(req.query.ano!= undefined) {
    console.log(req.query);
    render (res) (Obras.find_by_ano(res,req.query.ano));
  }
  else{ if(req.query.compositor != undefined && req.query.duracao != undefined){
            render (res) (Obras.find_by_compositor_and_duracao(res,req.query.compositor,req.query.duracao))
        }
        else {
          if(req.query.periodo!= undefined){
              render (res) (Obras.find_by_periodo(res,req.query.periodo));
          }
          else {
              render (res) (Obras.findall(res,req.query.perido));
          }

        }
    }
});

router.get('/obras/:id', (req, res, next) => {
  render (res) (Obras.find_by_id(res,req.params.id));
});

router.get('/compositores', (req, res, next) => {
  Obras.print("Chegeou o get /:id");
  render (res) (Obras.find_compositores(res));
});


module.exports = router;
