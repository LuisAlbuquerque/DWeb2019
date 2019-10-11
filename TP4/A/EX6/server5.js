var http = require("http")
var fs = require("fs")

var servidor = http.createServer((req,res) => {
    var partes = req.url.split("/");
    var pag = partes[partes.lenght -1];
    if(pag.math(/[1-3]/)){

        fs.readFile("pag" + pag + ".html", (err,data) => {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
            res.write(data);
            res.end();
            });
    }

    else {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
            res.write("Ficheiro inexistente" + pag);
            res.end();
    }
});

servidor.listen(7777);
