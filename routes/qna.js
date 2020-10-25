const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
router.get('/question',(req,res)=>{
    db.Qna.Question.findAll({
        order : [['ID','DESC']]
    })
    .then((data) => {
      res.json(data);
    });
});
router.post('/question',(req,res) => {
    console.log(req.body);
    var a=req.body;
    a.views=0;
    var today=new Date();
    a.writtenDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(a);
    db.Qna.Question.create(a).then( result => {
      res.json({success:true});  
    })
    .catch(err => {
      res.json({success: false});  
    })
});
module.exports = router;