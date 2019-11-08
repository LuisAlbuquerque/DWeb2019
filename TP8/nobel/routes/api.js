var express = require('express');
var mongoose = require('mongoose');
var Premios = require('../controllers/api')


var render = (res) => (ret) => ret
                            .then(dados => res.jsonp( dados ))
                            .catch(err => res.jsonp( err ));

var router = express.Router();

/* GET home page. */
router.get('/premios', (req, res, next) => {
  Premios.print("Chegeou o get /");
  ((req.query.categoria)!= undefined)?
        (req.query.data)?
            render (res) (Premios.find_by_category_and_data(res,req.query.categoria,req.query.data))
          : render (res) (Premios.find_by_category(res,req.query.categoria))
       : render (res) (Premios.findall(res))
});

//router.get('/premios?categoria=:id', (req, res, next) => {
//  Premios.print("Chegeou o get /:id");
//  Premios.find_by_category(res,req.params.id);
//});
/* Filme by id */
router.get('/premios/:id', (req, res, next) => {
  Premios.print("Chegeou o get /:id");
  render (res) (Premios.find_by_id(res,req.params.id));
});

/* List categorys*/
router.get('/categorias', (req, res, next) => {
  Premios.print("Chegeou o get categorias/");
  render (res) (Premios.category(res));
});

router.get('/laureados', (req, res, next) => {
  Premios.print("Chegeou o get /:id");
  render (res) (Premios.find_by_laureates(res));
});

/* Add movie */
router.post('/filmes', (req, res, next) => {
  Premios.print("Chegeou o post /filmes");
  render (res) (Premios.add(res,req.body));
});

router.delete('/filmes/:id', (req, res, next) => {
  Premios.print("Chegeou o delete /filmes/:id");
  render (res) (Premios.delete_(res,req.params.id));
});

/* Update movie */
router.put('/filmes/:id', (req, res, next) => {
  Premios.print("Chegeou o put /filmes/:id");
  Premios.print(req.body);
  body_ = (req.body);
  title_ = body_["title"]
  Premios.print(title_)
  render (res) (Premios.update(res,req.params.id,body_));
});

router.post('/update/:id', (req, res, next) => {
  Premios.print("Chegeou o put /filmes/:id");
  Premios.print(req.body);
  body_ = (req.body);
  title_ = body_["title"]
  Premios.print(title_)
  render (res) (Premios.update(res,req.params.id,body_));
});

router.get('/add', (req, res, next) => {
  res.render("add");
});

router.get('/filter', (req, res, next) => {
  res.render("filter");
});

router.post('/filter', (req, res, next) => {
  Premios.print(req.body);
  render (res) (Premios.find_by_filter(res,req.body));
});

router.get('/update/:id', (req, res, next) => {
  Premios.print("update id " + req.params.id)
  render (res) (Premios.find_and_update_by_id(res,req.params.id));
});

module.exports = router;
