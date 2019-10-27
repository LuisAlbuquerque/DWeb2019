var express = require('express');
var jsonfile = require('jsonfile')

var router = express.Router();
myBD = "arq-son-EVO.json";

var print = (string) => console.log(string);

function render_index(res,ficheiro){
    titulos = new Set();
    prov = new Set();
    ficheiro.forEach(element => {
      titulos.add(element["tit"]);
      prov.add(element["prov"]);
    });
    dict = {};

    // ordenar por provincia
    prov = Array.from(prov).sort();
    prov.forEach(p => dict[ p ] = [])
    ficheiro.forEach(element => {
      dict[ element["prov"] ].push( element["tit"] );
    });

    //ordenar por titulo
    prov.forEach(p => {
      dict[ p ] = Array.from(dict[ p ]).sort();
    });

    res.render('index', { dict: dict});
}
function arq(body_){
  return {
   tit : body_["Titulo"] ,
   prov : body_["Provincia"], 
   local : body_["Local"],
   inst : body_["Inst"], 
   file : { "@t" : body_["Tipo_f"] , "#text" : body_["Nome_f"]}, 
   musico : body_["musico"],
   duracao : body_["duracao"],
   obs : body_["obs_t"]
  };
}

router.get('/add', (req, res, next) => {
  res.render("add_other");
});

router.get('/mudar/:id', (req, res, next) => {
  tit = (req.params.id)
  var old_arq = {}
  var prov = "";
  var local = "";
  var musico = "";
  var duracao = "";
  var inst = "";
  var file_t = "";
  var file_text = "";
  jsonfile.readFile(myBD, (erro, ficheiro) => {
    if(!erro){
    ficheiro.forEach(element => {
      if(element["tit"] == tit){
        old_arq = element;
        print(element)
        prov = old_arq["prov"];
        local = old_arq["local"];
        inst = old_arq["inst"];
        musico = old_arq["musico"];
        duracao = old_arq["duracao"];
        file_t = old_arq["file"]["@t"];
        file_text = old_arq["file"]["#text"];
      }
    });

        print(prov)
        print(local)
        print(inst)
        print(file_t)
        print(file_text)

  res.render("change", {tit : tit,
                        prov : prov,
                        local: local,
                        inst: inst,
                        musico : musico,
                        duracao : duracao,
                        obs_t : obs_t,
                        file_t :file_t,
                        file_text :file_text });
  }else{
    res.render("error", {e : "Erro ao ler a base de Bados"});
  }
    });
  
});

router.post('/add_arq', (req, res, next) => {
  print(req.body);
  body_ = (req.body);
  new_arq = arq(body_);

     /*
    prov: 'Beira Baixa',
    local: 'Malpica do Tejo',
    tit: 'Moda da azeitona',
    inst: 'zamburra; almofariz; pandeiro; garrafa com garfo',
    file: { '@t': 'MP3', '#text': 'd1/evo098.mp3' },
    */

    jsonfile.readFile(myBD, (erro, ficheiro) => {
        if(!erro){
            print("Não deu erro ao ler o ficheiro") 
            //print(ficheiro)
            ficheiro.push(new_arq);
        jsonfile.writeFile(myBD,ficheiro,erro =>{
            if(erro){
              res.render("error", {e : "Erro ao escrever na Base de Dados"});
            }
            else{
               render_index(res,ficheiro);
            }
        });
    }
    else{ res.render("error", {e : "Erro ao ler a Base de Dados"})}
    });
  });

router.post('/change_arq/:id', (req, res, next) => {
  print("chegei change arq");
  tit = (req.params.id);
  print(req.body);
  body_ = (req.body);
  new_arq = arq(body_);

     /*
    prov: 'Beira Baixa',
    local: 'Malpica do Tejo',
    tit: 'Moda da azeitona',
    inst: 'zamburra; almofariz; pandeiro; garrafa com garfo',
    file: { '@t': 'MP3', '#text': 'd1/evo098.mp3' },
    */
    var old_arq;
    jsonfile.readFile(myBD, (erro, ficheiro) => {
        if(!erro){
            print("Não deu erro ao ler o ficheiro") 
            //print(ficheiro)
            new_ficheiro = [];
            ficheiro.forEach(element => {
              if(element["tit"] != tit)
                new_ficheiro.push(element);
              else{
                print(element)
                old_arq = element;
              }
            });
            /* DEBUG 
            print(new_arq["tit"])
            print(new_arq["prov"])
            print(new_arq["local"])
            print(new_arq["file"]["@t"])
            print(new_arq["file"]["#text"])
            print("---")
            print(old_arq["tit"])
            print(old_arq["prov"])
            print(old_arq["local"])
            print(old_arq["file"]["@t"])
            print(old_arq["file"]["#text"])
            */

            if( new_arq["tit"] == "" ) new_arq["tit"] = old_arq["tit"] ;     
            if( new_arq["prov"] == "" ) new_arq["prov"] = old_arq["prov"] ;     
            if( new_arq["local"] == "" ) new_arq["local"] = old_arq["local"] ;     
            if( new_arq["inst"] == "" ) new_arq["inst"] = old_arq["inst"] ;     
            if( new_arq["file"]["@t"] == "" ) new_arq["file"]["@t"]= old_arq["file"]["@t"];     
            if( new_arq["file"]["#text"] == "" ) new_arq["file"]["#text"]= old_arq["file"]["#text"];     
            if( new_arq["musico"] == "" ) new_arq["musico"] = old_arq["musico"];     
            if( new_arq["duracao"] == "" ) new_arq["duracao"] = old_arq["duracao"];     
            if( new_arq["obs"] == "" ) new_arq["obs"] = old_arq["obs"];     

            new_ficheiro.push(new_arq);
        jsonfile.writeFile(myBD,new_ficheiro,erro =>{
            if(erro){
               res.render("error" , {e : "Erro ao escrever na Base de Dados"});
            }
            else{
               render_index(res,new_ficheiro);
            }
        });
    }else{
      res.render("error" , {e : "Erro ao ler a Base de Dados"});
    }
    });
});

/* GET home page. */
router.get('/', (req, res, next) => {
    print("Entrei no get /") 
    //print(req.path)
    jsonfile.readFile(myBD, (erro, ficheiro) => {
        if(!erro){
            print("Não deu erro ao ler o ficheiro") 
            //print(ficheiro)
            render_index(res,ficheiro);
        }else
          res.render("error" , {e : "Erro ao ler a Base de Dados"});
    });
    //res.render('index', { title: 'Express' });
});


router.get('/:id', (req, res, next) => {
  print(req.params.id)
  tit = (req.params.id)
  //print(req.query.id)
  

    jsonfile.readFile(myBD, (erro, ficheiro) => {
        if(!erro){
            print("Não deu erro ao ler o ficheiro") 
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
            files = [];
            musico = "";
            duracao = "";
            obs = {};
            ficheiro.forEach(element => {
              if(element["tit"] == tit){
                  prov = element["prov"];
                  local = element["local"];
                  inst = element["inst"];
                  file_t = element["file"]["@t"];
                  file_text = element["file"]["#text"];
                  obs = element["obs"];
                  print(element);
                  if(obs != undefined){
                  if(typeof obs == 'string'){
                    obs_t = obs;
                    obs_files = [];

                  }else{
                    obs_t = obs["#text"];
                    obs_files = obs["file"];
                    if(Array.isArray(obs_files)){
                      obs_files = obs_files;
                    }else{ obs_files = [ obs_files ]; }
                }
              }else{
                obs_t = "";
                obs_files = [];
              }
                  musico = element["musico"];
                  duracao = element["duracao"];
              }

            });
          
            //print(files)
            res.render('arquivo', { tit : tit,
                                    prov: prov,
                                    local : local,
                                    inst : inst,
                                    musico : musico,
                                    duracao : duracao,
                                    file_t : file_t,
                                    file_text : file_text,
                                    obs_t : obs_t,
                                    obs_files : obs_files
                                  });
        }else{
            print("Deu erro ao ler o ficheiro!!");
            res.render("error", { e: "Erro ao ler a Base de Dados" });
        }
    });

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
            res.render("error", {e : "Erro ao escrever na Base de Dados"});
            }
            else{
               render_index(res,new_ficheiro);
            }
        })
        }else
            print("Deu erro ao ler o ficheiro!!") 
            res.render("error", {e : "Erro ao ler a Base de Dados"});
    });
});

module.exports = router;
