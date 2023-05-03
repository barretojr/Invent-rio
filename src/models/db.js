require('dotenv').config();

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        console.log('aconteceu algum erro');
        return global.connection;
    } else {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createPool(
            `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DATABASE}`
        );
        return connection;
    }
};

connect();

async function showInventario() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM Inventario');
    return rows;
};

exports.connect = connect;
module.exports = { connect, showInventario};


