const express = require('express');
const router = express.Router();
const db=require('../models/index.js');

router.get('/:id',(req,res)=>{
    db.Board.Reply.findAll({
      where: {Post_ID:req.params.id}
    }).then(result=>{
      res.json(result);
    })
});

router.post('/write',(req,res) => {
    db.Board.Reply.create(req.body).then(result =>{
      res.json({success:true});
  
  })
});
  
module.exports = router;