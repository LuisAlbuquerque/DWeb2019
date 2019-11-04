var FilmeModel = require('../models/filme');
var mongoose = require('mongoose');

API_DADOS = 0;

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

module.exports = {
    render,
    print ,
    render_page,
    render_page_all,
    render_page_movie,
    render_page_add,
    render_page_add_movie,
    render_page_update,
    render_page_update_movie,
    findall,
    find_by_id ,
    find_and_update_by_id ,
    find_by_title,
    find_by_filter,
    add_filme,
    update_filme,
    delete_filme 
}