var http = require("http")
var fs = require("fs")

var servidor = http.createServer((req,res) => {
    fs.readFile('index.html', (err,data) => {
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
        res.write(data);
        res.end();
        });
    });

servidor.listen(7777);
