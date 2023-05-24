const express = require('express');
const helmet = require('helmet');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');
const inventario = require('./routes/inventario');
const user = require('./routes/user');
const home = require('./routes/home');





app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(helmet());

app.use('/inventario', inventario);
app.use('/user', user);
app.use('/home', home)

app.set('view engine', 'ejs');

//Localhost
app.listen(port, () => {
    console.log(`Server running in ${port}`);
});


