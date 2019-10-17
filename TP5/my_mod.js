
var init_page = (purl) => (purl.pathname == "/") || (purl.pathname == "/todo_list");

var style_page = (purl) => purl.pathname == "/w3.css";

var write_header = (res) =>
    res.writeHead(200,{
        "Content-Type" : "text/html; charset=utf-8"
    });


var send_init_page = (res) => {
    write_header(res);
    res.write(pug.renderFile("index.pug"));
    res.end();
}

var write_error = (res,error) => res.write("<P>Erro: " + error + "</p>");


var pug_write_error = (res) =>
    res.write(pug.renderFile("erro.pug",
        {e: "ERRO: " + req.method + " não suportado"}));



var send_style_page = (res) => {
    write_header(res);
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
