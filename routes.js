const express = require('express');
const session = require('express-session');
const router = express.Router();
const database = require('./src/database/database');
const app = express();

// express-session middleware config
router.use(session({
    secret: 'teste',
    resave: false,
    saveUninitialized: true
}));

//Home route
// router.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     if (username === 'admin' && password === '123') {
//         req.session.user = {
//             username: username,
//         };
//         res.redirect('/');
//     } else {
//         res.render('login', { error: 'Usuário ou senha inválidos' });
//     }
// });

// router.get('/login', (req, res) => {
//     res.render('../src/views/login');
// })

//Search Route
router.get('/', async (req, res) => {
    try {
        const listagem = await database.showInventory();
        const input = JSON.parse(JSON.stringify(req.body));
        const id = input && input['input-filter'];

        res.render('../src/views/inventario', {
            listagem: listagem,
            id: id,
            item: {}
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro ao exibir os dados do servidor');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const connection = await database.connect();
        const [rows, _] = await connection.execute(
            'SELECT * FROM Inventario WHERE patrimonio=?;',
            [req.params.id]
        );
        if (rows.length === 0) {
            res.status(404).json({ mensagem: 'Item não encontrado' });
        } else {
            res.render('../src/views/inventario', {
                listagem: rows,
                itemId: req.params.id,
                item: {}
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            mensagem: 'Ocorreu um erro ao listar o item',
            erro: req.params.id,
        });
    }
});

// Add Route
router.post('/add', async (req, res) => {
    const {
        'input-valor-compra': valorCompra,
        'input-patrimonio': patrimonio,
        'input-unidade': unidade,
        'input-descricao': descricao,
        'input-modelo': modelo,
        'input-departamento': localizacao,
        'input-usuario': usuario,
        'input-serie': nserie,
        'input-data': data_compra,
    } = req.body

    const currencyRegex = /[\D]/g;
    const valorCompraNumerico = Number(valorCompra?.replace(currencyRegex, '').replace(',', '.'));
    const data = {
        patrimonio,
        unidade,
        descricao,
        modelo,
        localizacao,
        valorestim: valorCompraNumerico,
        usuario,
        nserie,
        data_compra,
    };

    try {
        const connection = await database.connect();
        await connection.query('INSERT INTO Inventario SET ?', [data]);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send({
            mensagem: 'Ocorreu um erro ao inserir os dados',
        });
    }
});

//Delete Route
router.get('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const connection = await database.connect();
        const result = await connection.execute(
            'DELETE FROM Inventario WHERE patrimonio = ?', [userId]
        );
        connection.release();
        if (result.affectedRows === 0) {
            res.status(404).send('Registro não encontrado');
        } else {
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocorreu um erro ao excluir os dados');
    }
});

//Edit Route
router.post('/items/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const { unidade, descricao, modelo, localizacao, valorestim, usuario, nserie, data_compra } = req.body;
        const currencyRegex = /[\D]/g;
        const valorCompraNumerico = Number(valorestim.replace(currencyRegex, '').replace(',', '.'));
        const connection = await database.connect();
        await connection.query(
            'UPDATE Inventario SET unidade=?, descricao=?, modelo=?, localizacao=?, valorestim=?, usuario=?, nserie=? data_compra=? WHERE patrimonio=?;',
            [unidade, descricao, modelo, localizacao, valorCompraNumerico, usuario, nserie, data_compra, itemId]
        );
        connection.release();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send({
            mensagem: 'Ocorreu um erro ao atualizar os dados',
        });
    }
});

router.get('/api/items/:id', async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        if (!Number.isInteger(itemId)) {
            throw new Error('O ID do item deve ser um número inteiro. ');
        }
        const connection = await database.connect();
        const result = await connection.query(
            'SELECT * FROM Inventario WHERE patrimonio = ?',
            [itemId]
        );
        connection.release();
        res.json(result[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            mensagem: 'Ocorreu um erro ao buscar as informações do item'
        });
    }
});

module.exports = router;