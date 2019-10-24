var express = require('express');
var jsonfile = require('jsonfile')

var router = express.Router();
myBD = "arq-son-EVO.json";

var print = (string) => console.log(string);

 
router.get('/add', (req, res, next) => {
  res.render("add_other");
});

router.get('/mudar', (req, res, next) => {
  res.render("change");
});

/* GET home page. */
router.get('/', (req, res, next) => {
    print("Entrei no get /") 
    //print(req.path)
    jsonfile.readFile(myBD, (erro, ficheiro) => {
        if(!erro){
            print("Não deu erro ao ler o ficheiro") 
            //print(ficheiro)
            titulos = new Set();
            prov = new Set();
            ficheiro.forEach(element => {
              titulos.add(element["tit"]);
              prov.add(element["prov"]);
              
            });
        dict = {};
        prov.forEach(p => dict[ p ] = [])
        ficheiro.forEach(element => {
          dict[ element["prov"] ].push( element["tit"] );
          
        });
            prov = Array.from(prov).sort();
        //print(dict)
            res.render('index', { dict: dict});
        }else
            print("Deu erro ao ler o ficheiro!!") 
        //else{
        //    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        //    res.write(pug.renderFile('erro.pug', {e: "Erro: na leitura da BD"}))
        //    res.end() 
        //}
    });
    //res.render('index', { title: 'Express' });
});


router.get('/:id', (req, res, next) => {
  print("Chegei Alvorada");
  print(req.params.id)
  tit = (req.params.id)
  //print(req.query.id)
  

    jsonfile.readFile(myBD, (erro, ficheiro) => {
        if(!erro){
            print("Não deu erro ao ler o ficheiro") 
            //print(ficheiro)
            //print(ficheiro)
            //tit = "Alvorada";
     /*
    prov: 'Beira Baixa',
    local: 'Malpica do Tejo',
    tit: 'Moda da azeitona',
    inst: 'zamburra; almofariz; pandeiro; garrafa com garfo',
    file: { '@t': 'MP3', '#text': 'd1/evo098.mp3' },
    */
            prov = "";
            local = "";
            inst = "";
            file_t = "";
            file_text = "";
            ficheiro.forEach(element => {
              if(element["tit"] == tit){
                  prov = element["prov"];
                  local = element["local"];
                  inst = element["inst"];
                  file_t = element["file"]["@t"];
                  file_text = element["file"]["#text"];
              }

            });
          
            res.render('arquivo', { tit : tit,
                                    prov: prov,
                                    local : local,
                                    inst : inst,
                                    file_t : file_t,
                                    file_text : file_text
                                  });
        }else
            print("Deu erro ao ler o ficheiro!!") 
        //else{
        //    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        //    res.write(pug.renderFile('erro.pug', {e: "Erro: na leitura da BD"}))
        //    res.end() 
        //}
    });
  res.render('arquivo');

});

router.delete("/:id", (req, res) => {
  print(req.params.id)
  tit = (req.params.id)
  //res.render("error");
    jsonfile.readFile(myBD, (erro, ficheiro) => {
        if(!erro){
            print("Não deu erro ao ler o ficheiro") 
            //print(ficheiro)
            new_ficheiro = [];
            ficheiro.forEach(element => {
              if(element["tit"] != tit)
                new_ficheiro.push(element);
              else
                print(element)
            });
        jsonfile.writeFile(myBD,new_ficheiro,erro =>{
            if(erro){
                console.log(erro);
            }
            else{
                res.render('index', { dict: dict});

                titulos = new Set();
                prov = new Set();
                new_ficheiro.forEach(element => {
                  titulos.add(element["tit"]);
                  prov.add(element["prov"]);
                });
                dict = {};
                prov.forEach(p => dict[ p ] = [])
                new_ficheiro.forEach(element => {
                  dict[ element["prov"] ].push( element["tit"] );
                  
                });
                prov = Array.from(prov).sort();
                res.render('index', { dict: dict});
            }
        })
            //titulos = new Set();
            //prov = new Set();
            //new_ficheiro.forEach(element => {
            //  titulos.add(element["tit"]);
            //  prov.add(element["prov"]);
              
           // });
        //dict = {};
        //prov.forEach(p => dict[ p ] = [])
        //new_ficheiro.forEach(element => {
        //  dict[ element["prov"] ].push( element["tit"] );
        //  
        //});
        //    prov = Array.from(prov).sort();
           // res.render('index', { dict: dict});
        }else
            print("Deu erro ao ler o ficheiro!!") 
    });
});

module.exports = router;
