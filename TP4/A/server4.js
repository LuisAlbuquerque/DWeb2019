var http = require("http")
var url = require("url")

var servidor = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
    var q = url.parse(req.url,true).query;
    res.write('True: <pre>' + JSON.strigfy(q) + '</pre>');
    var qtext = url.parse(req.url,false).query ;
    res.end('False: <pre>' + JSON.strigfy(qtext) + '</pre>');
    });

servidor.listen(7777);
