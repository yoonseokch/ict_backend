const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
db.Board.Reply.belongsTo(db.User.User,{
  foreignKey:'User_ID',
  targetKey: 'ID'
});
db.User.User.belongsTo(db.Board.Reply,{
  foreignKey:'ID',
  targetKey: 'User_ID'
});
router.get('/:postid',(req,res)=>{
    db.Board.Reply.findAll({
      where: {Post_ID:req.params.postid},
      include : {
        model : db.User.User
      }
    }).then(result=>{
      res.json(result);
    })
});

router.post('/write',(req,res) => {

    var a=req.body;
    var today=new Date();
    a.writtenDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    a.reports=0;
    db.Board.Reply.create(a).then(result =>{
      res.json({success:true});
  
  })
});
  
module.exports = router;