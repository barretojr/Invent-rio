const express = require('express');
var db = require ('./public/js/db.js')
const app = express();
const port = 8080;


app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('../views/index');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.use(express.static(__dirname + '/public'));


app.get('/listar', async (req, res) => {
    try {                
        const listagem = await db.query('SELECT * FROM Inventario', []);
        if (listagem.length === 0) {
            res.render('lista_vazia');
        } else {
            res.render('lista', { lista: listagem });
        }
    } catch (erro) {
      console.error(erro);
      res.status(500).send('Ocorreu um erro ao listar o inventário.');
    }
  });


app.get('/add', (req, res) => {
    res.render('../views/index')
});

app.post('/add',(req, res) => {
    res.status(200).send('req.body');    
});


