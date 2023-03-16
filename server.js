const express = require('express');
const db = require('./private/js/db');
const app = express();
const port = 8080;
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const listagem = await db.showInventario();

    res.render('../views/index', {
        listagem: listagem,
    });
});



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/private'));

app.get('/add', (req, res) => {
    res.render('../views/index');
});

app.post('/add', async (req, res) => {
    res.status(200).send('req.body');
});
