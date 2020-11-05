const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
router.get('/',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({ success : false});
    db.Board.Post.findAll({
      where : {
        User_ID : decoded.id
      },
      order : [['ID','DESC']]
    }).then((data)=>{
      res.json(data);
    })    
  })  
})
router.get('/reply',(req,res)=>{
    db.Board.Post.hasMany(db.Board.Reply,
        {
            foreignKey:'Post_ID'
        });
    db.Board.Reply.belongsTo(db.Board.Post,{
    foreignKey: 'ID'
    });
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        if (err) res.json({ success : false});
        db.Board.Post.findAll(
            {
            include : [
                {
                model : db.Board.Reply,
                where: {
                  User_ID : decoded.id
                }
                }
            ],
            order : [['ID','DESC']]
        }
        ).then((data)=>{
            res.json(data);
        })    
    })  
});

module.exports = router;