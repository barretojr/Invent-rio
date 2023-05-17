require('dotenv').config();

async function connect() {
    try {
        const mysql = require('mysql2/promise');
        const connectionPool = await mysql.createPool({
            host: process.env.DB_URL,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE,
            connectionLimit: 10, // Configura o limite de conexões do pool
            namedPlaceholders: true, // Habilita o uso de placeholders nomeados em queries
            timezone: '-03:00' // Define o fuso horário padrão das datas para UTC
        });
        const connection = await connectionPool.getConnection();
        return connection

    } catch (error) {
        console.error('Erro ao conectar ao banco de dados: ', error);
        throw error;
    }
}

async function showInventory() {
    let conn
    try {
        conn = await connect();
        const [rows] = await conn.execute('SELECT * FROM Inventario');
        rows.forEach(row => {
            if (row.data_compra !== null) {
                const dateValue = row.data_compra.toISOString();
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
                row.formattedDataCompra = new Date(dateValue).toLocaleDateString('pt-BR', options);
            } else {
                row.formattedDataCompra = 'Data de compra não disponível';
            }
        })
        return rows;
    } catch (error) {
        console.error('Erro ao mostrar o inventário', error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

async function createITAsset(inventory) {
    let conn;
    try {
      conn = await connect();
      const sql =
        'INSERT INTO Inventario (unidade, descricao, modelo, localizacao, valorestim, usuario, nserie, data_compra, modificado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);';
      const values = [
        inventory.unidade,
        inventory.descricao,
        inventory.modelo,
        inventory.localizacao,
        inventory.valorestim,
        inventory.usuario,
        inventory.nserie,
        inventory.data_compra
      ];
      if (
        !inventory.unidade ||
        !inventory.descricao ||
        !inventory.modelo ||
        !inventory.localizacao ||
        !inventory.valorestim ||
        !inventory.usuario ||
        !inventory.nserie ||
        !inventory.data_compra
      ) {
        throw new Error('Dados inválidos');
      }
      return await conn.query(sql, values);
    } catch (error) {
      console.error('Erro ao registrar item no banco de dados', error);
      throw error;
    }
  }
  



async function editAsset(id, inventory) {
    const conn = await connect();
    const sql =
        'UPDATE Inventario SET unidade=?, descricao=?, modelo=?, localizacao=?, valorestim=?, usuario=?, nserie=?, data_compra WHERE patrimonio=?;    ';
    const values = [
        inventory.unidade,
        inventory.descricao,
        inventory.modelo,
        inventory.localizacao,
        inventory.valorestim,
        inventory.usuario,
        inventory.nserie,
        inventory.data_compra,
        id,
    ];
    return await conn.query(sql, values);
}

async function deleteAsset(id) {
    const conn = await connect();
    const sql = 'DELETE FROM Inventario WHERE patrimonio=?;';
    const values = [id];
    return await conn.query(sql, values);
}

module.exports = {
    connect,
    showInventory: showInventory,
    createITAsset: createITAsset,
    editAsset: editAsset,
    deleteAsset: deleteAsset,
};
