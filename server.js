const express = require('express');
const db = require("./private/js/db");
const app = express();
const port = 8080;
var router = express.Router();
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');


app.set('view engine', 'ejs');

app.get('/index', (req, res) => {
    res.render('../views/index');
});

app.get('/', (req,res) =>{
    res.render('../views/home');
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.use(express.static(__dirname + '/public'));
app.use(express.static('private'));

app.get('/add', (req, res) => {
    res.render('../views/index')
});

app.post('/add',(req, res) => {
    res.status(200).send('req.body');    
});

app.get('/listar', async (req, res) => {
    
    const listagem = await db.showInventario();
    if (listagem.length === 0) {
       res.render('listagem');
    } else {
        res.render(lista, { lista: listagem });
    }      
  });





