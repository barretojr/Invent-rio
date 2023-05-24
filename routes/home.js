const express = require('express');
const router = express.Router();


router.get('/inital',async (req, res)=>{
    res.render('../src/views/home.ejs')
})

module.exports = router;