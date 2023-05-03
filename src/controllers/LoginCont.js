const db = require('../models/db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

exports.index = async (req, res) =>{
    res.render('../views/login.ejs');
}

exports.login = async (req, res) =>{
    const { email, senha } = req.body;
    const connection = await db.connect();
    const user = await connection.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (user.length === 0) {
        return res.status(401).send('Email ou senha incorretos').json('Email ou senha incorretos');
    }
    const senhaCorreta = await bcrypt.compare(senha, user[0].senha);
    if (!senhaCorreta) {
        return res.status(401).send('Email ou senha incorretos').json('Email ou senha incorretos');
    }
    req.session.user = {
        id: user[0].id,
        nome: user[0].nome,
        nomeUsuario: user[0].nomeUsuario
    };
    const token = jwt.sign({userId: 1}, SECRET, {expiresIn: 300});
    res.redirect('/home');
    return res.json({auth: true, token})
}