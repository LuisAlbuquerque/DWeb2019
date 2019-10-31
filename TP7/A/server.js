var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/filmes', {useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Ligação ao MongoDB feita com sucesso!')

//mongose.connect('mongodb://127.0.0.1:27017/filmesc', {userNewUrlParser})

var filmeSchema = new mongoose.Schema({
    title: String,
    year: Number,
    cast: Array,
    genres: Array
  });

  var FilmeModel = mongoose.model('filmesc', filmeSchema);

  var jcrMovie = new FilmeModel({ title: 'Teste da aula de DW2019',
                                    year: 2019, 
                                    cast: ["jcr", "aluno1", "aluno2"], 
                                    genres:["Drama", "ComÃ©dia"]});
console.log("vou inserir este filme na DB " + jcrMovie.title);

jcrMovie.save(function (err, filme) {
    if (err) return console.error(err);
    else
      console.log(filme.title + ' foi gravado com sucesso.')
  });

FilmeModel.findOne({title: /Era uma/},(err, filmes)=> {
    if (err) return console.error(err);
    else console.log("Recuperei o fileme: "+ filmes);
})
/*
FilmeModel.find(function (err, filmes) {
    if (err) return console.error(err);
    else console.log(filmes);
})
*/


});
