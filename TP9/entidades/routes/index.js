var express = require('express');
var mongoose = require('mongoose');
var Filmes = require('../controllers/nobels')
var axios = require("axios")

var link = (query) => "http://clav-api.dglab.gov.pt/api/entidades"+query+"?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ"

var api_get = (url) => (res )=> (result) => {
  axios.get(link(url))
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

var render_page = (res,
                  dados,
                  tit_page,
                  single_Atributes,
                  multi_Atributes,
                  object_Atributes) => (page) => 
                            res.render(page, {DATA : dados,
                                              TIT_PAGE : tit_page,
                                              POST_action : "/premios",
                                              PUT_action : "/premios",
                                              single_Atributes : single_Atributes,
                                              multi_Atributes : multi_Atributes,
                                              object_Atributes : object_Atributes} );


var render_page_index = (res,dados,tit_page,id,atribute) => render_page(res,dados,tit_page,id,atribute,[]) ("index");
var render_page_index_special = (res,dados,tit_page,id,atribute) => render_page(res,dados,tit_page,id,atribute,[]) ("index_special");
var render_page_one = (res,dados,tit_page,sA,mA,oA) => render_page(res,dados,tit_page,sA,mA,oA) ("one");
var render_page_one_special = (res,dados,tit_page,sA,mA,oA) => render_page(res,dados,tit_page,sA,mA,oA) ("one_special");

var render_page_add = (res,tit_page,sA,mA,oA) => render_page(res,[],tit_page,sA,mA,oA) ("add");
var render_page_error = (res) => render_page(res,[],"",[],[],[]) ("error");

var render_page_update = (res,dados,tit_page,sA,mA,oA) => render_page(res,dados,tit_page,oA) ("update");
var render_page_filter = (res,dados,tit_page) => render_page(res,dados,tit_page,[],[],[]) ("filter");

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  api_get ("") (res) (dados => render_page_index_special(res,dados.data, "Lista de entidades","id",""));
  //api_get (req.url) (dados => console.log(dados.data));
});

/* by id */
router.get('/:id', (req, res, next) => {
  api_get ("/" + req.params.id)(res) (
    dados =>{ 
        api_get("/" + req.params.id + "/tipologias") (res) (
          tipologia =>{
            api_get("/" + req.params.id + "intervencao/dono")(res) (
              dono =>{
                api_get("/" + req.params.id + "inrervencao/participante")(res) (
                  participante =>{
                    render_page_one_special(res,dados.data, "Entidade",["id","sigla","estado","internacional","designacao","sioe"],[tipologia,dono,participante],[])
             } )
         } )
      } )
   });
  //api_get (req.url) (dados => render_page_one_special(res,dados.data, "Entidade",["id","sigla","estado","internacional","designacao","sioe"],[],[])
});

/* Filme by title 
router.post('/title', (req, res, next) => {
  Filmes.print("Chegeou o get title/");
  Filmes.find_by_title(res,req.body["title"]);
});
*/

/* Add */
router.post('/premios', (req, res, next) => {
  Filmes.print("Chegeou o post /premios");
  Filmes.print(req.body);
  body_ = (req.body);
  var laureates_ = [];
  if (Array.isArray(body_["firstname"])){
    console.log("if");
    for(let i=0; i < body_["firstname"].length; i++){
      laureates_.push({ firstname : body_["firstname"][i],
                      surname : body_["surname"][i],
                      motivation : body_["motivation"][i],
                      share : body_["share"][i]
            });
      console.log({ firstname : body_["firstname"][i],
                            surname : body_["surname"][i],
                            motivation : body_["motivation"][i],
                            share : body_["share"][i]
                  })
    }
    var object = {
              year : body_["year"],
              category : body_["category"],
              laureates : laureates_
            }
  }else {
    console.log("else");
    var object = {
              year : body_["year"],
              category : body_["category"],
              laureates : [{
                         firstname : body_["firstname"],
                         surname : body_["surname"],
                         motivation : body_["motivation"],
                         share : body_["share"],
              }]
            };
  }
  console.dir(object);
  api_post (req.url) (dados => render_page_index_special(res,dados.data, "Premios Nobel","id","category"));
  //Filmes.add_filme(res,body_);
});

/* Delete */
router.delete('/premios/:id', (req, res, next) => {
  Filmes.print("Chegeou o delete /premios/:id");
  Filmes.delete_filme(res,req.params.id);
});

/* Update */
router.put('/premios/:id', (req, res, next) => {
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
  //res.render("add");
  render_page_add(res,"Adicionar um premio nobel",["year","category"],["firstname","surname","motivation","share"],[])
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
  render_page_add(res,"Adicionar um premio nobel",["year","category"],["firstname","surname","motivation","share"],[])
  //render_page_update(res,[], "Premios Nobel (update)",["_id","category"],[],[]);
                    //(res,dados,tit_page,sA,mA,oA)
  //Filmes.find_and_update_by_id(res,req.params.id);
});

module.exports = router;
