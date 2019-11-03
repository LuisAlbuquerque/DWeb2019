var express = require('express');
var mongoose = require('mongoose');

API_DADOS = 0;

mongoose.connect('mongodb://localhost/filmes', {useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useFindAndModify', false);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {
//  console.log('Ligação ao MongoDB feita com sucesso!')

var filmeSchema = new mongoose.Schema({
    title: String,
    year: Number,
    cast: Array,
    genres: Array
  });

collection = "filmesc";
var FilmeModel = mongoose.model(collection,filmeSchema);

var render = (res,dados) => res.jsonp( dados );
var print = (string) => console.log(string);

var render_page = (res,dados) => (page) => res.render(page, {data : dados} );

var render_page_all = (res,dados) => render_page(res,dados) ("index");
var render_page_movie = (res,dados) => render_page(res,dados) ("movie");

var render_page_add = (res,dados) => render_page(res,dados) ("add");
var render_page_add_movie = (res,dados) => render_page(res,dados) ("add_movie");

var render_page_update = (res,dados) => render_page(res,dados) ("update");
var render_page_update_movie = (res,dados) => render_page(res,dados) ("update_movie");

var findall = (res) => {
  FilmeModel.find().sort({title:1}).exec((err, filmes) => {
      if (err) print(err);
      else (API_DADOS) ? render(res,filmes) : render_page_all(res,filmes);
    });
}

var find_by_id = (res,id) => {
  FilmeModel.findById(id,(err, filmes) => {
        if (err) print(err);
        else (API_DADOS) ? render(res,filmes) : render_page_movie(res,filmes);
      });
}

var find_and_update_by_id = (res, id) => {
  FilmeModel.findById(id,(err, filmes) => {
        if (err) print(err);
        else (API_DADOS) ? render(res,filmes) : render_page_update(res,filmes);
      });
  }

var find_by_title = (res,title_value) => {
  FilmeModel.find( { title: {$regex  : title_value} }).exec(
    (err, filmes) => {
        if (err) print(err);
        else (API_DADOS) ? render(res,filmes) : render_page_all(res,filmes);
      });
}

var find_by_filter= (res,filter) => {
  FilmeModel.find( { title: {$regex  : filter["title"]}, year :{ $gt : filter["year_gt"], $lt : filter["year_lt"]} }).exec(
    (err, filmes) => {
        if (err) print(err);
        else (API_DADOS) ? render(res,filmes) : render_page_all(res,filmes);
      });
}

var add_filme = (res,filme) => {
  var object_file = new FilmeModel(filme);
  object_file.save( (err) => {
    if(err) (API_DADOS) ? render(res,{ok : -1}) : render_page_all(res,filmes);
    else {

        FilmeModel.find().sort({title:1}).exec((err, filmes) => {
            if (err) print(err);
            else (API_DADOS) ? render(res,filmes) : render_page_all(res,filmes);
    });
    }
  });
}

var update_filme = (res,id,update) => {
 FilmeModel.findByIdAndUpdate(id,update,(err)=> {
   if(err) render(res, {ok : -1});
   else (API_DADOS) ? render(res,{ok : 1}) : find_by_id(res,id);
 });
}

var delete_filme = (res,id) => {
  FilmeModel.deleteOne({_id : id},(err) => {
    if(err) render(res, {ok : -1});
    else render(res,{ ok : 1});
  });
}


var router = express.Router();

/* GET home page. */
router.get('/filmes', (req, res, next) => {
  print("Chegeou o get /");
  findall(res);
});

/* Filme by id */
router.get('/filmes/:id', (req, res, next) => {
  print("Chegeou o get /:id");
  find_by_id(res,req.params.id);
});

/* Filme by title */
router.post('/title', (req, res, next) => {
  print("Chegeou o get title/");
  find_by_title(res,req.body["title"]);
});

/* Add movie */
router.post('/filmes', (req, res, next) => {
  print("Chegeou o post /filmes");
  print(req.body);
  body_ = (req.body);
  add_filme(res,body_);
});

router.delete('/filmes/:id', (req, res, next) => {
  print("Chegeou o delete /filmes/:id");
  delete_filme(res,req.params.id);
});

/* Update movie */
router.put('/filmes/:id', (req, res, next) => {
  print("Chegeou o put /filmes/:id");
  print(req.body);
  body_ = (req.body);
  //render(res,body_); 
  title_ = body_["title"]
  print(title_)
  update_filme(res,req.params.id,body_);
});

router.post('/update/:id', (req, res, next) => {
  print("Chegeou o put /filmes/:id");
  print(req.body);
  body_ = (req.body);
  title_ = body_["title"]
  print(title_)
  update_filme(res,req.params.id,body_);
});

router.get('/add', (req, res, next) => {
  res.render("add");
});

router.get('/filter', (req, res, next) => {
  res.render("filter");
});

router.post('/filter', (req, res, next) => {
  find_by_filter(res,req.body);
});

router.get('/update/:id', (req, res, next) => {
  print("update id " + req.params.id)
  find_and_update_by_id(res,req.params.id);
  //find_by_id(res,req.params.id)
});


/*
{
        "cast": [
            "jcr",
            "aluno1",
            "aluno2"
        ],
        "genres": [
            "Drama",
            "ComÃ©dia"
        ],
        "_id": "5db81c61880569668a013a3a",
        "title": "Teste da aula de DW2019",
        "year": 2019,
        "__v": 0
    },
*/
module.exports = router;
