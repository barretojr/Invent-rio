const express = require('express');
var db = require ('./public/js/db')
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


app.get('/listar',(req,res)=>{
    db.query('SELECT * FROM Inventario',[],function(erro,listagem){
        if (erro){
            res.status(200).send(erro);
        }
        res.render('lista',{lista : listagem})
    });
})


app.get('/add', (req, res) => {
    res.render('../views/index')
});

app.post('/add',(req, res) => {
    res.status(200).send('req.body');    
});


