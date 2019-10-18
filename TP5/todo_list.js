var  http = require("http");
var  url = require("url");
var  pug = require("pug");
var fs = require("fs");
var jsonfile = require("jsonfile");

var {parse} = require("querystring");

var myBD = "todo_list.json";

var init_page = (purl) => (purl.pathname == "/") || (purl.pathname == "/todo_list");

var style_page = (purl) => purl.pathname == "/w3.css";

var print = (string) => console.log(string);

var write_header = (res) =>
    res.writeHead(200,{
        "Content-Type" : "text/html; charset=utf-8"
    });

var write_header_css = (res) =>
    res.writeHead(200,{
        "Content-Type" : "text/css"
    });


var send_init_page = (res) => {
    write_header(res);
    jsonfile.readFile(myBD, (error, tasks) =>{
        if(!error)
            res.write(pug.renderFile("index.pug" , {Tasks : tasks}));
        else
            res.write(pug.renderFile("erro.pug" , {e: "Erro na leitura da Base de dados."}));

        res.end();
    });
}

var write_error = (res,error) => res.write("<P>Erro: " + error + "</p>");

var send_page_error = (res) => {
    write_header(res);
    write_error(res);
    res.end();
}

var pug_write_error = (res) =>
    res.write(pug.renderFile("erro.pug",
        {e: "ERRO: " + req.method + " não suportado"}));



var send_style_page = (res) => {
    write_header_css(res);
    fs.readFile("stylesheets/w3.css", (erro,dados) => {
        if(!erro){
            res.write(dados);
        }
        else {
            write_error(res,erro);
        }
        res.end();
    });
}

var myServer = http.createServer((req,res) =>{
    var purl = url.parse(req.url,true);
    var query = purl.query;

    console.log(req.method + " " + purl.pathname);
    switch(req.method){
        case "GET":
            if(init_page(purl)){
                send_init_page(res);
            }
            else if(style_page(purl)){
                    send_style_page(res);
                }
                else { send_page_error(res) ; }
            break;

        case "POST":
            write_header(res);
            if(purl.pathname == "/add_task"){
                recuperaInfo(req,resultado => {
                    jsonfile.readFile(myBD,(erro,tasks) => {
                        if(!erro){
                            tasks.push(resultado);
                            jsonfile.writeFile(myBD,tasks,erro =>{
                                if(erro){
                                    console.log(erro);
                                    send_page_error(res);
                                    res.end();
                                }
                                else{
                                    console.log("Tarefa adicionada com sucesso");
                                    res.write(pug.renderFile('index.pug', {Tasks: tasks}));
                                    res.end();
                                }
                            })
                        }
                    })
                });
            }
            else {
                task_to_remove = (purl.pathname.split("/")[2]);    
                task_to_remove = (task_to_remove.split("%20").join(" "));

                    jsonfile.readFile(myBD,(erro,tasks) => {
                        if(!erro){
                            print(tasks);
                            r_i = -1;
                            for(var i=0 in tasks){
                                print(i)
                                print(tasks[i])
                                if(tasks[i]["task"] == task_to_remove){
                                    //print(task_to_remove + " " + tasks[i])
                                    r_i = i;
                                    break;
                                }
                            }
                            if(r_i != -1){
                                delete tasks[r_i];
                                tasks = tasks.filter(t => t != null);
                            }
                            print(task_to_remove);
                            print(tasks);
                                jsonfile.writeFile(myBD,tasks,erro =>{
                                    if(erro){
                                        console.log(erro);
                                        send_page_error(res);
                                        res.end();
                                    }
                                    else{
                                        console.log("Tarefa removida com sucesso");
                                        res.write(pug.renderFile('index.pug', {Tasks: tasks}));
                                        res.end();
                                    }
                                
                                });

                    }   
                    });
            }
        
            break;
        default:
            write_header(res);
            pug_write_error(res);
            res.end()
    }

});

myServer.listen(5005, ()=>{
    console.log("Servidor à escuta na porta 5005")
})

function recuperaInfo(request,callbak){
    if(request.headers["content-type"] == "application/x-www-form-urlencoded"){
        let body = "";
        request.on("data", bloco => {
            body += bloco.toString();
            print(bloco.toString());
        });
        request.on("end", () => {
            callbak(parse(body));
        })
    }
}
