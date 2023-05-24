const express = require('express');
const router = express.Router();
const database = require('../src/database/database.js');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res, next) => {
    try {
        const connection = await database.connect();
        if (connection) {
            const results = await connection.execute('SELECT * FROM Users WHERE email=?', [req.body.email]);
            
            if (results.length > 0) {
                bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
                    if (errBcrypt) {
                        return res.status(500).send({ error: errBcrypt });
                    }
                    connection.execute(
                        'INSERT INTO Users (name, username, password, email, created_at, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);',
                        [req.body.name, req.body.username, hash, req.body.email],
                        (error, results) => {
                            connection.release();
                            if (error) {
                                return res.status(500).send({ error: error });
                            }
                            res.redirect('/home');
                        }
                    );
                });
            } else {
                res.status(409).send({
                    mensagem: "Já cadastrado"
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
});

router.post('/auth', async (req, res) => {
    const connection = await database.connect();
    if (connection){ 
        const results = await connection.query('SELECT * FROM Users WHERE email=?', [req.body.email])
        try{
            connection.release();            
            if(results.length < 1){
                return res.status(401).send({mensagem: 'Falha na autenticação'})
            }
            bcrypt.compare(req.body.password, results[0].password, (err, result)=>{
                if(err){
                    return res.status(401).send({mensagem: 'Falha na autenticação'})
                }if(result){
                    return res.status(200).send({mensagem: 'Bem-vindo'});
                }                
                return res.status(401).send({mensagem: 'Falha na autenticação'})
            })
        }catch(err){
            console.log(err)

        }
    }
})


module.exports = router;