//constant
const express = require('express')
const app = express.Router();


const InventarioCont = require('./src/controllers/InventarioCont')
const LoginCont = require('./src/controllers/LoginCont')

const { loginRequired } = require('./src/middlewares/middleware');


//get
app.get('/inventario', loginRequired, InventarioCont.list);
app.get('/inventario/:id', loginRequired, InventarioCont.list);

app.get('/login',LoginCont.index);



//post
app.post('/inventario/cad', loginRequired, InventarioCont.register);

app.post('/login/auth', LoginCont.login);


//delete
app.delete('/inventario/delete/:id', loginRequired, InventarioCont.delete);


app.use((req, res) => {
    res.status(404).sendFile(__dirname + '../src/views/404');
  });