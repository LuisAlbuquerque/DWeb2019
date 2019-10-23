const express = require('express');
const app = express();
const port = 3021;

app.get('/', (req,res) => res.end('Hello world!'))

app.listen(port,() => console.log(`Hello app listening on port ${port}!`));
