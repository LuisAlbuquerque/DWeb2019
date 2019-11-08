var express = require('express');
var mongoose = require('mongoose');
var Filmes = require('../controllers/nobels')
var axios = require("axios")

var api_get = (url) => (result) => {
  axios.get("http://localhost:3000/api/" + url)
    .then(dados => {
      result(dados);
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

var render_page = (res,
                  dados,
                  tit_page,
                  single_Atributes,
                  multi_Atributes,
                  object_Atributes) => (page) => 
                            res.render(page, {DATA : dados,
                                              TIT_PAGE : tit_page,
                                              single_Atributes : single_Atributes,
                                              multi_Atributes : multi_Atributes,
                                              object_Atributes : object_Atributes} );


var render_page_index = (res,dados,tit_page,id,atribute) => render_page(res,dados,tit_page,id,atribute,[]) ("index");
var render_page_one = (res,dados,tit_page,sA,mA,oA) => render_page(res,dados,tit_page,sA,mA,oA) ("one");

var render_page_add = (res,dados,tit_page,sA,mA,oA) => render_page(res,dados,tit_page,sA,mA,oA) ("add");
var render_page_error = (res) => render_page(res,[],"",[],[],[]) ("error");

var render_page_update = (res,dados,tit_page,sA,mA,oA) => render_page(res,dados,tit_page,oA) ("update");
var render_page_filter = (res,dados,tit_page) => render_page(res,dados,tit_page,[],[],[]) ("filter");

var router = express.Router();

/* GET home page. */
router.get('/premios', (req, res, next) => {
  Filmes.print("Chegeou o get /");

  api_get (req.url) (dados => render_page_index(res,dados.data, "Premios Nobel","_id","category"));
  //api_get (req.url) (dados => console.log(dados.data));
});

/* Filme by id */
router.get('/premios/:id', (req, res, next) => {
  Filmes.print("Chegeou o get /:id");
  api_get (req.url) (dados => render_page_one(res,dados.data, "Premio Nobel",["year","category"],[],["laureates"]));
  //api_get (req.url) (dados => console.log(dados.data));
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
  Filmes.print(req.body);
  Filmes.find_by_filter(res,req.body);
});

router.get('/update/:id', (req, res, next) => {
  Filmes.print("update id " + req.params.id)
  Filmes.find_and_update_by_id(res,req.params.id);
});

module.exports = router;
