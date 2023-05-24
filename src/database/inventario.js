require('dotenv').config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_URL,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    },
});

const tabela = 'Inventario';
knex(tabela)
    .select('*')
    .then((rows) => {
        // manipular resltados ...
        console.log(rows);
    })
    .catch((error) => {

        console.error(error);
    })
    .finally(() => {
        knex.destroy();
    });