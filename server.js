const express = require('express');
const helmet = require('helmet');
const app = express();
const routes = require('./routes');
const port = 8080;
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static(__dirname + '/public'));
app.use(helmet());

app.set('view engine', 'ejs');

//Localhost
app.listen(port, () => {
    console.log(`Server running in ${port}`);
});



