//constantes de codigo
const express = require('express');
const db = require('./private/js/db');
const app = express();
const port = 8080;
const bodyparser = require('body-parser');
const {body, validationResult} = require('express-validator');
const {response} = require('express');
const session = require('express-session');

//carregamento da engine ejs
app.set('view engine', 'ejs');

//implementação da verificação de login
app.use(bodyparser.urlencoded({extended:true}));

//render pagina inicial
app.get("/", (req,res)=>{
  res.render("../public/home");
})

//inicio select no banco
app.get('/inventario/', async (req, res) => {
    const listagem = await db.showInventario();
    res.render('../views/inventario', {
        listagem: listagem,
    });
});


//rodando na porta
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

//carregamento das pastas de programa
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/private'));




//rotas das funções
//localizar item
app.get('/inventario/:id', async (req, res) => {  
  try {
      const connection = await db.connect();
      const [rows, listagem] = await connection.execute(
        'SELECT * FROM Inventario WHERE patrimonio=?;',
        [req.params.id]      
      );     
      if (rows.length === 0) {
        res.render('../views/inventario', {
          listagem: rows,
      });
      } else {        
        res.render('../views/inventario', {
            listagem: rows,
        });
      }
    } catch (error) {
        console.log(error);
      res.status(500).send({
        mensagem:'Ocorreu um erro ao listar o item',
        erro: req.params.id
    });    
    }
  });
  
//adicionar item
app.post('/add', async (req, res) => {
        try {
        const connection = await db.connect();
        await connection.query(
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
        res.send('<script> alert("Ocorreu um erro ao inserir os dados"); </script>');        
    }
});

//editar item
app.post('/edit/:id', async(req, res) =>{
    try {
        const connection = await db.connect();
        const [resultado, fields] = await connection.query(
            'UPDATE Inventario SET unidade=?, descricao=?, modelo=?, localizacao=?, valorestim=?, usuario=?, nserie=? WHERE patrimonio=?;',
            [req.body.unidade, req.body.descricao, req.body.modelo, req.body.localizacao, req.body.valorestim, req.body.usuario, req.body.nserie, req.params.id]
        );                
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


//deletar item
  app.get('/delete/:id', async (req, res) => {
    var idpatri = req.params.id;    
    try {
      const connection = await db.connect();
      await connection.query(
        'DELETE FROM Inventario WHERE patrimonio=?;',
        idpatri
      )
      res.status(200).send('Dados excluídos com sucesso');
    } catch (error) {
      console.log(error);
      res.status(500).send('Ocorreu um erro ao excluir os dados');
    }
  });

//carregando bodyparser com json 
app.use(bodyparser.json());

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/minha-rota', (req, res) => {
  const sessionId = req.session.id; 
});

//validação
app.post("/user",[
    body("username").isLength({min: 5, max: 50}).withMessage("Usuário não está correto!"),
    body("password").isLength({min: 5, max: 50}).withMessage("Senha não está correta")
], (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()} );
    }
    res.json({msg: "sucesso"});
    return response.json(request.body);
});

app.get("/cadastro", (req, res)=>{
  res.sendFile(__dirname + "/views/cadastro.html")
})


















//rota 404
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
  });
