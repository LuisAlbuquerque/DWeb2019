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

/* List categorys*/
router.get('/categorias', (req, res, next) => {
  Obras.print("Chegeou o get categorias/");
  render (res) (Obras.category(res));
});

router.get('/laureados', (req, res, next) => {
  Obras.print("Chegeou o get /:id");
  render (res) (Obras.find_by_laureates(res));
});

/* Add movie */
router.post('/filmes', (req, res, next) => {
  Obras.print("Chegeou o post /filmes");
  render (res) (Obras.add(res,req.body));
});

router.delete('/filmes/:id', (req, res, next) => {
  Obras.print("Chegeou o delete /filmes/:id");
  render (res) (Obras.delete_(res,req.params.id));
});

/* Update movie */
router.put('/filmes/:id', (req, res, next) => {
  Obras.print("Chegeou o put /filmes/:id");
  Obras.print(req.body);
  body_ = (req.body);
  title_ = body_["title"]
  Obras.print(title_)
  render (res) (Obras.update(res,req.params.id,body_));
});

router.post('/update/:id', (req, res, next) => {
  Obras.print("Chegeou o put /filmes/:id");
  Obras.print(req.body);
  body_ = (req.body);
  title_ = body_["title"]
  Obras.print(title_)
  render (res) (Obras.update(res,req.params.id,body_));
});

router.get('/add', (req, res, next) => {
  res.render("add");
});

router.get('/filter', (req, res, next) => {
  res.render("filter");
});

router.post('/filter', (req, res, next) => {
  Obras.print(req.body);
  render (res) (Obras.find_by_filter(res,req.body));
});

router.get('/update/:id', (req, res, next) => {
  Obras.print("update id " + req.params.id)
  render (res) (Obras.find_and_update_by_id(res,req.params.id));
});

module.exports = router;
