//constantes de codigo
const express = require('express');
const db = require('./private/js/db');
const app = express();
const port = 8080;
const bodyparser = require('body-parser');
// const cookieParser = require('cookie-parser');
const {body, validationResult} = require('express-validator');
const bodyParser = require('body-parser');

//carregamento da engine ejs
app.set('view engine', 'ejs');

//implementação da verificação de login
app.use(bodyparser.urlencoded({extended:true}));

//inicio da aplicação com select no banco
app.get('/', async (req, res) => {
    const listagem = await db.showInventario();
    res.render('../views/index', {
        listagem: listagem,
    });
});

app.post('/',(req,res)=>{
    res.render('index')
});

//rodando na porta
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

//carregamento das pastas de programa
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/private'));


//rotas das funções
app.get('/add', (req, res) => {
    res.render('../views/index');
});

app.post('/add', async (req, res) => {
    res.status(200).send('req.body');
});

app.get('/delete/.id', async(req,res)=>{

})


app.use(bodyparser.json());
//validação
app.post("/user",[
    body("username").isLength({min: 5, max: 50}).withMessage("Usuário não está correto!"),
    body("password").isLength({min: 5, max: 50}).withMessage("Senha não está correta")
], (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()} );
    }

    res.json({msg: "sucesso"})
})