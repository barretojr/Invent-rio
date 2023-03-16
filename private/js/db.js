async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        console.log('aconteceu algum erro');
        return global.connection;
    } else {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection(
            'mysql://gruposj:Alemanha-1982@bdsj.mysql.uhserver.com/bdsj'
        );
        return connection;
    }
}

connect();

async function showInventario() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM Inventario');
    return rows;
}

module.exports = { showInventario };
