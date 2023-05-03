const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

const routes = require('./routes');

//load engine ejs
app.set('view engine', 'ejs');

//run port
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acessar http://localhost:${port}`);
});

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/public'));
app.use(routes);