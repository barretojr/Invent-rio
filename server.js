//constantes de codigo
const express = require('express');
const db = require('./private/js/db');
const app = express();
const port = 8080;
const bodyparser = require('body-parser');
const {body, validationResult} = require('express-validator');
const { listarItem } = require('./private/js/db');

//carregamento da engine ejs
app.set('view engine', 'ejs');

//implementação da verificação de login
app.use(bodyparser.urlencoded({extended:true}));

//inicio da aplicação com select no banco
app.get('/', async (req, res) => {
    const listagem = await db.showInventario();
    res.render('../views/inventario', {
        listagem: listagem,
    });
});

app.post('/',(req,res)=>{
    res.render('inventario')
});

//rodando na porta
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

//carregamento das pastas de programa
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/private'));


//rotas das funções
app.get('/inventario/:id', async (req, res) => {
    try {
      const connection = await db.connect;
      const [rows, fields] = await connection.execute(
        'SELECT * FROM Inventario WHERE patrimonio=?;',
        [req.params.id]
      );
      connect.release();
      if (rows.length === 0) {
        res.status(404).send({
            mensagem:'Item não encontrado'
        });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      res.status(500).send({
        mensagem:'Ocorreu um erro ao listar o item',
        erro: req.params.id
    });
    //oi
    }
  });
  //tudo bem

app.post('/add', async (req, res) => {
        try {
        const connection = await db.connect();
        const [resultado, fields] = await connection.query(
            'INSERT INTO Inventario (patrimonio, unidade, descricao, modelo, localizacao, valorestim, usuario, nserie) VALUES(?, ?, ?, ?, ?, ?, ?, ?);',
            [req.body.patrimonio, req.body.unidade, req.body.descricao, req.body.modelo, req.body.localizacao, req.body.valorestim, req.body.usuario, req.body.nserie]
        );
        connect.release();
        res.status(200).send({
            mensagem:'Dados inseridos com sucesso'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            mensagem:'Ocorreu um erro ao inserir os dados'
        });
    }
});

app.post('/edit/:id', async(req, res) =>{
    try {
        const connection = await db.connect();
        const [resultado, fields] = await connection.query(
            'UPDATE Inventario SET unidade=?, descricao=?, modelo=?, localizacao=?, valorestim=?, usuario=?, nserie=? WHERE patrimonio=?;',
            [req.body.unidade, req.body.descricao, req.body.modelo, req.body.localizacao, req.body.valorestim, req.body.usuario, req.body.nserie, req.params.id]
        );
        connect.release();
        res.status(200).send({
            mensagem:'Dados atualizados com sucesso'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            mensagem:'Ocorreu um erro ao atualizar os dados'
        });
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
      const connection = await db.connect();
      const [resultado, fields] = await connection.query(
        'DELETE FROM Inventario WHERE patrimonio=?;',
        [req.params.id]
      );
      connect.release();
      res.status(200).send('Dados excluídos com sucesso');
    } catch (error) {
      console.log(error);
      res.status(500).send('Ocorreu um erro ao excluir os dados');
    }
  });

//carregando bodyparser com json
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

