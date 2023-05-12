const db = require('../models/db');

exports.index = async (req, res) =>{
    res.render('./cadastro');
}

