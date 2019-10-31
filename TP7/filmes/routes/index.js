var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/filmes', {useNewUrlParser: true, useUnifiedTopology: true });

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

var findall = (res) => {
  FilmeModel.find((err, filmes) => {
      if (err) print(err);
      else render(res,filmes);
    })
}

var find_by_id = (res,id) => {
  FilmeModel.findById(id,(err, filmes) => {
        if (err) print(err);
        else render(res,filmes);
      });
}

var find_by_title = (res,title_value) => {
  FilmeModel.find( { title: title_value }).exec(
    (err, filmes) => {
        if (err) print(err);
        else render(res,filmes);
      });
}

var add_filme = (res,filme) => {
  var object_file = new FilmeModel(filme);
  object_file.save( (err) => {
    if(err) render(res, {ok : -1});
    else render(res,{ ok : 1});
  });
}

var update_filme = (res,id,update) => {
 //cast_ = update["cast"]; 
 //genres_ = update["genres"]; 
 //title_ = update["title"]; 

 ////FilmeModel.updateOne({ cast : cast_ }, { genres : genres_ }, { title : title_}, (err, filme)=> {
 ////  if(err) render(res, {ok : -1});
 ////  else render(res,filme);
 ////});
 FilmeModel.findByIdAndUpdate(id,update,(err)=> {
   if(err) render(res, {ok : -1});
   else render(res, {ok : 1});
 });

}
var delete_filme = (res,id) => {
  FilmeModel.deleteOne({_id : id},(err) => {
    if(err) render(res, {ok : -1});
    else render(res,{ ok : 1});
  });
}

//findall()

//});

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
router.get('/title/:id', (req, res, next) => {
  print("Chegeou o get title/:id");
  find_by_title(res,req.params.id);
});

/* Add movie */
router.post('/filmes', (req, res, next) => {
  print("Chegeou o post /filmes");
  print(req.body);
  body_ = (req.body);
  //render(res,body_); 
  add_filme(res,body_);
});

router.delete('/filmes/:id', (req, res, next) => {
  print("Chegeou o delete /filmes/:id");
  delete_filme(res,req.params.id);
});

router.put('/filmes/:id', (req, res, next) => {
  print("Chegeou o put /filmes/:id");
  print(req.body);
  body_ = (req.body);
  //render(res,body_); 
  title_ = body_["title"]
  print(title_)
  update_filme(res,req.params.id,body_);
  //FilmeModel.findByIdAndUpdate(req.params.id,body_,(err)=> {
  //  if(err) render(res, {ok : -1});
  //  else render(res, {ok : 1});
  //});
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
