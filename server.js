//constantes de codigo
const express = require('express');
const db = require('./private/js/db');
const app = express();
const port = 8080;
const bodyparser = require('body-parser');
const {body, validationResult} = require('express-validator');
const {response} = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

//carregamento da engine ejs
app.set('view engine', 'ejs');

//implementação da verificação de login
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({extended:true}));

//render pagina inicial
app.get("/", (req,res)=>{
  res.render("../public/home");
})
//renderizar pagina de login
app.get("/login", (req, res) =>{
  res.render("../views/login");
})
//post de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

  if (user.length === 0) {
    return res.status(401).send('Email ou senha incorretos');
  }

  const senhaCorreta = await bcrypt.compare(senha, user[0].senha);

  if (!senhaCorreta) {
    return res.status(401).send('Email ou senha incorretos');
  }
  req.session.user = {
    id: user[0].id,
    nome: user[0].nome,
    nomeUsuario: user[0].nomeUsuario
  };
  res.redirect('/dashboard');
});

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
// Rota para cadastrar um usuário
app.post('/cadastro', async (req, res) => {
  const connection = await db.connect();
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const nomeUsuario = req.body.nomeUsuario;

  // Verifica se todas as informações foram enviadas
  if (!nome || !email || !senha || !nomeUsuario) {
    return res.status(400).send('Por favor, preencha todos os campos');
  }
  // Verifica se o e-mail já foi cadastrado
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao verificar o e-mail no banco de dados');
    }
    if (results.length > 0) {
      return res.status(400).send('O e-mail já foi cadastrado');
    }

    // Cria o hash da senha usando bcrypt
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) {
        return res.status(500).send('Erro ao criptografar a senha');
      }

      // Insere o usuário no banco de dados
      db.query(
        'INSERT INTO usuarios (nome, email, senha, nome_usuario) VALUES (?, ?, ?, ?)',
        [nome, email, hash, nomeUsuario],
        (err, results) => {
          if (err) {
            return res.status(500).send('Erro ao cadastrar o usuário no banco de dados');
          }
          return res.status(200).send('Usuário cadastrado com sucesso');
        }
      );
    });
  });
});

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
