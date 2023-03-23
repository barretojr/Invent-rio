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
        //oi
    }
}

connect();

async function showInventario() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM Inventario');
    return rows;
}

async function cadInventario(invent){
    const conn = await connect();
    const sql = 'INSERT INTO Inventario (unidade, descricao, modelo, localizacao, valorestim, usuario, nserie) VALUES(?, ?, ?, ?, ?, ?, ?);';
    const values =[invent.patrimonio, invent.unidade, invent.descricao, invent.modelo, invent.localizacao, invent.valorestim, invent.usuario, invent.nserie];
    return await conn.query(sql, values);
}

async function editInventario(id, invent){
    const conn = await connect();
    const sql = 'UPDATE Inventario SET unidade=?, descricao=?, modelo=?, localizacao=?, valorestim=?, usuario=?, nserie=? WHERE patrimonio=?;    ';
    const values =[invent.unidade, invent.descricao, invent.modelo, invent.localizacao, invent.valorestim, invent.usuario, invent.nserie, id];
    return await conn.query(sql, values);
}

async function deleteInventario(id){
    const conn = await connect();
    const sql = 'DELETE FROM Inventario WHERE patrimonio=?;';
    const values =[id]
    return await conn.query(sql, values);
}


exports.connect = connect;
module.exports = { connect, showInventario, cadInventario, editInventario, deleteInventario};


