require('dotenv').config();
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_URL,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        },
        migrations: {
            directory: './public/migrations'
        }
    }
};

