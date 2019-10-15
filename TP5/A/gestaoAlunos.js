var  http = require("http");
var  url = require("url");
var  pug = require("pug");
var fs = require("fs");
var jsonfile = require("jsonfile");

var {parse} = require("querystring");

var myBD = "alunos.json";

var myServer = http.createServer((req,res) =>{
    var purl = url.parse(req.url,true);
    var query = purl.query;

    console.log(req.method + " " + purl.pathname);
    switch(req.method){
        case "GET":
            if((purl.pathname == "/") || purl.pathname == "/gestaoAlunos"){
                res.writeHead(200,{
                    "Content-Type" : "text/html; charset=utf-8"
                })
                res.write(pug.renderFile("index.pug"))
                res.end()
            }
            else if(purl.pathname == "/w3.css"){
                res.writeHead(200,{
                    "Content-Type" : "text/html; charset=utf-8"
                })
                fs.readFile("stylesheets/w3.css", (erro,dados) => {
                    if(!erro){
                        res.write(dados);
                        //console.log(dados);
                    }
                    else {
                        res.write("<P>Erro: " + erro + "</p>");
                    }
                    res.end();
                })
            }
            else if(purl.pathname == "/listar"){
                jsonfile.readFile(myBD,(erro,alunos) => {
                    res.writeHead(200,{
                        "Content-Type" : "text/html; charset=utf-8"
                    });
                    if(!erro){
                        res.write(pug.renderFile("Lista-alunos.pug", {lista: alunos}));
                    }
                    else{
                        res.write(pug.renderFile("erro.pug", {e: "Erro na leitura da Bd"}));
                    }
                    res.end()
                })
            }

            else if(purl.pathname == "/registar"){
                jsonfile.readFile(myBD,(erro,alunos) => {
                    res.writeHead(200,{
                        "Content-Type" : "text/html; charset=utf-8"
                    });
                    res.write(pug.renderFile("from-aluno.pug"));
                    res.end()
                })
            }
            break;
        case "POST":
            if(purl.pathname == "/aluno"){
                recuperaInfo(req,resultado => {
                    jsonfile.readFile(myBD,(erro,alunos) => {
                        if(!erro){
                            alunos.push(resultado);
                            jsonfile.writeFile(myBD,alunos,erro =>{
                                if(erro){ console.log(erro); }
                                else{
                                    console.log("Registo gravado com sucesso")
                                }
                            })
                        }
                    }
                });
            }
            break;
        default:
            res.writeHead(200,{
                "Content-Type" : "text/html; charset=utf-8"
            })
            res.write(pug.renderFile("erro.pug",
                {e: "ERRO: " + req.method + " não suportado"}))
            res.end()
    }

});

myServer.listen(5005, ()=>{
    console.log("Servidor à escuta na porta 5005")
})

function recuperaInfo(request,callbak){
    if(request.headers["content-type"] == "application/x-www-form-urlencoded"){
        let body = ""
        request.on("data",bloco = > {
            body += bloco.toString();
        })
        request.on("end", () => {
            callbak(parse(body))
        })
    }
}
