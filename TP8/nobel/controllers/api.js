var NobelModel = require('../models/nobel');
var mongoose = require('mongoose');


//var render = (res,dados) => res.jsonp( dados );
var print = (string) => console.log(string);

var render_page = (res,dados) => (page) => res.render(page, {data : dados} );

var render_page_all = (res,dados) => render_page(res,dados) ("index");
var render_page_movie = (res,dados) => render_page(res,dados) ("movie");

var render_page_add = (res,dados) => render_page(res,dados) ("add");
var render_page_add_movie = (res,dados) => render_page(res,dados) ("add_movie");

var render_page_update = (res,dados) => render_page(res,dados) ("update");
var render_page_update_movie = (res,dados) => render_page(res,dados) ("update_movie");

var findall = (res) => {
  return NobelModel
        .find({},{year : 1, category : 1 })
        .sort({category:1})
        .exec();
}

var find_by_category = (res,categoria) => {
  return NobelModel
         .find({category : categoria})
         .sort({category:1})
         .exec();
}

var find_by_laureates = (res) => {
  return NobelModel
            .aggregate([
                      {$unwind : "$laureates"},
                      {$group : {_id : "$laureates", ano : {$first : "$year"},categoria : {$first : "$category"}}},
                      {$project : {"_id" : { "firstname" : 1, "surname" : 1}, "ano" : 1, "categoria" : 1}}
                    ])
            .sort({_id:1})
            .exec();
}
//db.prizes.aggregate([{$unwind : "$laureates"},{$group : {_id : "$laureates", ano : {$first : "$year"},categoria : {$first : "$category"}}},{$project : {"_id" : { "firstname" : 1}, "ano" : 1, "categoria" : 1}}]).pretty()


//db.prizes.find({"category" : "medicine", "year" : {$gt : "2016"}}).pretty()
//http://localhost:3000/api/premios?categoria=literature&data=2016
var find_by_category_and_data = (res,categoria,data) => {
  return NobelModel
          .find(
            {"category" : "medicine",
             "year" : {$gt : 2016}})
          .sort({category:1})
          .exec();
}

var find_by_id = (res,id) => {
  return NobelModel
          .findById(id)
          .exec();
}

var category = (res) => {
  return NobelModel
            .aggregate([ {"$group" : {_id : "$category"}}])
            .exec();
}

var find_and_update_by_id = (res, id) => {
  return NobelModel
            .findById(id)
            .exec();
  }

var find_by_title = (res,title_value) => {
  return NobelModel
            .find( { title: {$regex  : title_value} })
            .exec();
}

var find_by_filter= (res,filter) => {
  return NobelModel
            .find(query)
            .exec();
}

var add = (res,filme) => {
  var object_file = new NobelModel(filme);
  return object_file
            .save()
            .exec();
}

var update = (res,id,update) => {
 return NobelModel
          .findByIdAndUpdate(id,update)
          .exec();
}

var delete_ = (res,id) => {
  return NobelModel
            .deleteOne({_id : id})
            .exec(); 
}

module.exports = {
    //render,
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
    category,
    find_and_update_by_id ,
    find_by_category,
    find_by_laureates,
    find_by_category_and_data,
    find_by_filter,
    add,
    update,
    delete_
}