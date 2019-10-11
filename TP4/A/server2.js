var http = require("http")
var meta = require("./my-mod")

var servidor = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
    res.write("Criada com nodejs por " + 
              meta.myName() +
              "  " + meta.myDateTime());
    res.end();
    }).listen(7777);
