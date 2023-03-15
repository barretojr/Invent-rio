const mysql = require('mysql2/promise');

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }
  try {
    const connection = await mysql.createPool({        
        host: 'bdsj.mysql.uhserver.com',        
        user: 'gruposj',
        password: '@lemanha1982',
        database: 'bdsj',
        multipleStatements: true
    });
    global.connection = connection;
    return connection;
  } catch (error) {
        console.error(error);
        throw new Error('Não foi possível conectar ao banco de dados.');
  }
}

connect();

// async function showInventario(){
//     const con = await connect();
//     const [rows] = con.query('SELECT * FROM Inventario');
//     return await rows;
// }

// async function cadInventario(item){
//     const con = await connect();
//     const sql = 'INSERT INTO Inventario (idpatrimonio, unidade, descricao, modelo, localizacao, valorestim, usuario, nserie) VALUES(?, ?, ?, ?, ?, ?, ?, ?);'
//     const values = [item.patrimonio, item.unidade, item.descricao, item.modelo, item.localizacao, item.valorestim, item.usuario, item.nserie]
//     await con.query(sql, values);
// }

// async function editInventario(id, item){
//     const con = await connect();
//     const sql = 'UPDATE Inventario SET unidade=?, descricao=?, modelo=?, localizacao=?, valorestim=?, usuario=?, nserie=? WHERE idpatrimonio=?;'
//     const values = [id, item.unidade, item.descricao, item.modelo, item.localizacao, item.valorestim, item.usuario, item.nserie]
//     await con.query(sql, values);
// }


// module.exports = {showInventario}
