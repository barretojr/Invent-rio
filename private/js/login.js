require('dotenv').config();

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        console.log('aconteceu algum erro');
        return global.connection;
    } else {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection(
            `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DATABASE}`
        );
        return connection;
    }
}

async function cadUsuario(id, value){
    const conn = await connect();
    const sql = '';
    const values =[];
    return await conn.query(sql, values);
}
//oi