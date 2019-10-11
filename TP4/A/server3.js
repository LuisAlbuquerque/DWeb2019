var http = require("http")

var servidor = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
    res.write(req.url);
    console.dir(req)
    res.end();
    });

servidor.listen(7777);
