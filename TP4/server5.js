var http = require("http")
var fs = require("fs")

var last = (l) => l [ l.length - 1];
var print = (string) => console.log(string);
var ptint_object = (object) => console.dir(object);
var int = (string) => parseInt(string);
var len = (object) => object.length

ARQ=["arq-d1e1034.xml","arq-d1e3180.xml","arq-d1e5116.xml","arq-d1e7477.xml","arq-d1e1126.xml","arq-d1e3248.xml","arq-d1e5168.xml","arq-d1e7551.xml","arq-d1e1203.xml","arq-d1e329.xml","arq-d1e5243.xml","arq-d1e7644.xml","arq-d1e1276.xml","arq-d1e3325.xml","arq-d1e5314.xml","arq-d1e7721.xml","arq-d1e1357.xml","arq-d1e3398.xml","arq-d1e5401.xml","arq-d1e7790.xml","arq-d1e1455.xml","arq-d1e3472.xml","arq-d1e5472.xml","arq-d1e7867.xml","arq-d1e1526.xml","arq-d1e3528.xml","arq-d1e552.xml","arq-d1e791.xml","arq-d1e1597.xml","arq-d1e3610.xml","arq-d1e5650.xml","arq-d1e7929.xml","arq-d1e165.xml","arq-d1e3710.xml","arq-d1e5737.xml","arq-d1e8215.xml","arq-d1e1686.xml","arq-d1e3759.xml","arq-d1e5799.xml","arq-d1e8292.xml","arq-d1e1757.xml","arq-d1e3807.xml","arq-d1e5875.xml","arq-d1e8363.xml","arq-d1e1829.xml","arq-d1e3862.xml","arq-d1e5949.xml","arq-d1e8426.xml","arq-d1e1906.xml","arq-d1e3918.xml","arq-d1e6048.xml","arq-d1e8500.xml","arq-d1e1977.xml","arq-d1e3973.xml","arq-d1e6109.xml","arq-d1e8568.xml","arq-d1e2063.xml","arq-d1e3.xml","","arq-d1e6189.xml","arq-d1e8655.xml","arq-d1e2131.xml","arq-d1e4037.xml","arq-d1e6267.xml","arq-d1e8732.xml","arq-d1e2202.xml","arq-d1e407.xml","arq-d1e626.xml","arq-d1e8803.xml","arq-d1e2296.xml","arq-d1e4092.xml","arq-d1e6341.xml","arq-d1e88.xml","arq-d1e2360.xml","arq-d1e4156.xml","arq-d1e6428.xml","arq-d1e891.xml","arq-d1e2434.xml","arq-d1e4217.xml","arq-d1e6533.xml","arq-d1e8992.xml","arq-d1e2499.xml","arq-d1e4279.xml","arq-d1e6611.xml","arq-d1e9081.xml","arq-d1e2576.xml","arq-d1e4334.xml","arq-d1e6695.xml","arq-d1e9181.xml","arq-d1e261.xml","arq-d1e4420.xml","arq-d1e6798.xml","arq-d1e9271.xml","arq-d1e2653.xml","arq-d1e4488.xml","arq-d1e6865.xml","arq-d1e9348.xml","arq-d1e2722.xml","arq-d1e4571.xml","arq-d1e7018.xml","arq-d1e9416.xml","arq-d1e2789.xml","arq-d1e4626.xml","arq-d1e7083.xml","arq-d1e9485.xml","arq-d1e2852.xml","arq-d1e4719.xml","arq-d1e715.xml","arq-d1e9558.xml","arq-d1e2929.xml","arq-d1e4793.xml","arq-d1e7188.xml","arq-d1e9663.xml","arq-d1e2987.xml","arq-d1e481.xml","arq-d1e7259.xml","arq-d1e972.xml","arq-d1e3051.xml","arq-d1e4892.xml","arq-d1e7325.xml","arq-d1e3123.xml","arq-d1e4973.xml","arq-d1e7412.xml"]
NUMBER_of_PAGES = len(ARQ);
var servidor = http.createServer((req,res) => {
    var partes = req.url.split("/");
    var pag = last (partes);
   fs.readFile("ARQ/" + ARQ[pag], (err,data) => {
       if(err){
           print(ARQ[pag])
           res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
           res.write("Ficheiro inexistente" + pag);
           res.end();
       }
       else {
   res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
   res.write(data);
   res.end();
       
       }
   });
   // if(int(pag) > 0 && int(pag) <= NUMBER_of_PAGES){
   //     fs.readFile("ARQ/" + ARQ[pag], (err,data) => {
   //         res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
   //         res.write(data);
   //         res.end();
   //         });
   //     }

   // else{

   //         res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
   //         res.write("Ficheiro inexistente" + pag);
   //         res.end();
   // 
   //     }
    }

);

servidor.listen(7777);
