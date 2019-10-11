var http = require("http")

/* HTTP ERROR codes
 * 200 - OK
 * 300 - OK resposta em cache
 * 400 - Auth
 * 500 - Erro do servidor
*/

/* Método  HTTP 
 * GET - Obter informaçoes
 * POST - Envio informaçoes
 * PUT - Envio para alteraçoes
*/
http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end("Olá turma 2019");
    }).listen(7777);
