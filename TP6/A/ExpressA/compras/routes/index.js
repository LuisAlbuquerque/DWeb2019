var express = require('express');
var router = express.Router();

var myDB = __dirname + "../compras.json"
console.log(myBD)

/* GET home page. */
router.get('/', function(req, res, next) {
  jsonFile.readFile(myBD,(erro,compras)=>{
      if(!erro){
          res.render("index",{lista: compras});
          
      }else {
          res.render("error", {error: erro});
      }
  }
  res.render('index', {lista: []});
});

router.post("/", (req,res)=>{
    jsonFile.readFile(myBD, (erro,compras) => {
        if(erro) console.log(erro);
        else console.log("Registo gravado com sucesso");
        
    })
    }
})

module.exports = router;
