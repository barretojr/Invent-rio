var express = require ('express');


(async () => {
    const db = require ("./db");
    const inventario = await db.showInventario();
})();

//rota de listagem de inventário//
router.get('/listar', function(req, res){
    db.query('SELECT * FROM Inventario',[],function(erro,listagem){
        if (erro){
            res.status(200).send(erro);
        }
        res.render('lista',{lista :listagem})
    });
});

// router.get('/add', function(req, res){
//     res.render('form');
// });

// router.post('/add', function(req, res){
//     res.status(200).send(req.body);
// });







module.exports = router;