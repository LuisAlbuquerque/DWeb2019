var mongoose = require("mongoose")
var Schema = mongoose.Schema

var FilmesSchema = new Schema({
    title : {type : String, required: true},
    year : {tyle : Number, require : true},
    cast : Array,
    generes : Array 
})

module.exports = mongoose.model("filmes", FilmesSchema)