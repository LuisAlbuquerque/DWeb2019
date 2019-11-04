var express = require('express');
var mongoose = require('mongoose');
var Filmes = require('../controllers/filmes')


var router = express.Router();

/* GET home page. */
router.get('/filmes', (req, res, next) => {
  Filmes.print("Chegeou o get /");
  Filmes.findall(res);
});

/* Filme by id */
router.get('/filmes/:id', (req, res, next) => {
  Filmes.print("Chegeou o get /:id");
  Filmes.find_by_id(res,req.params.id);
});

/* Filme by title */
router.post('/title', (req, res, next) => {
  Filmes.print("Chegeou o get title/");
  Filmes.find_by_title(res,req.body["title"]);
});

/* Add movie */
router.post('/filmes', (req, res, next) => {
  Filmes.print("Chegeou o post /filmes");
  Filmes.print(req.body);
  body_ = (req.body);
  Filmes.add_filme(res,body_);
});

router.delete('/filmes/:id', (req, res, next) => {
  Filmes.print("Chegeou o delete /filmes/:id");
  Filmes.delete_filme(res,req.params.id);
});

/* Update movie */
router.put('/filmes/:id', (req, res, next) => {
  Filmes.print("Chegeou o put /filmes/:id");
  Filmes.print(req.body);
  body_ = (req.body);
  title_ = body_["title"]
  Filmes.print(title_)
  Filmes.update_filme(res,req.params.id,body_);
});

router.post('/update/:id', (req, res, next) => {
  Filmes.print("Chegeou o put /filmes/:id");
  Filmes.print(req.body);
  body_ = (req.body);
  title_ = body_["title"]
  Filmes.print(title_)
  Filmes.update_filme(res,req.params.id,body_);
});

router.get('/add', (req, res, next) => {
  res.render("add");
});

router.get('/filter', (req, res, next) => {
  res.render("filter");
});

router.post('/filter', (req, res, next) => {
  Filmes.find_by_filter(res,req.body);
});

router.get('/update/:id', (req, res, next) => {
  Filmes.print("update id " + req.params.id)
  Filmes.find_and_update_by_id(res,req.params.id);
});

module.exports = router;
