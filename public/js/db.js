async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({    
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test',
        multipleStatements: true
    });
    global.connection = connection;
    return connection;
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


// module.exports = {showInventario, editInventario, cadInventario}