const db = require('../models/db');

exports.list = async(req, res) => {
  const listagem = await db.showInventario();
    res.render('../views/inventario', {
        listagem: listagem,
    });
};


exports.register = async(req, res) =>{
  const input = JSON.parse(JSON.stringify(req.body));
  const valorCompra = input['input-valor-compra'].replace('R$', '').trim('').replace(/\./g, '').replace(',', '.');
  const data = {
      patrimonio: input['input-patrimonio'],
      unidade: input['input-unidade'],
      descricao: input['input-descricao'],
      modelo: input['input-modelo'],
      localizacao: input['input-departamento'],
      valorestim: valorCompra,
      usuario: input['input-usuario'],
      nserie: input['input-serie'],
  };
  try {
      const connection = await db.connect();
      await connection.query(
          'INSERT INTO Inventario SET ? ',
          data,
          (err, rows) => {
              if (err) {
                  console.log(`Erro ao inserir :%s ${err}`);
              }
              res.redirect('/');
          }
      );
      res.status(200);
      res.redirect('/');
  } catch (error) {
      console.log(error);
      res.status(500).send({
          message: 'Ocorreu um erro ao inserir os dados',
      });
  };
};

exports.edit = async(req, res) =>{
//inserir a ideia de edit

}

exports.delete = async(req,res) =>{
  const userId = req.params.id;
    try {
      const connection = await db.connect();
      await connection.query(
          'DELETE FROM Inventario WHERE patrimonio=?;',
          [userId],
          (err, rows) => {
              if (err) {
                 console.log('Erro ao deletar');
                }
          }
        );
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocorreu um erro ao excluir os dados');
    };
};

