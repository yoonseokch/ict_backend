const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
db.User.User.belongsTo(db.Board.Post,
  {
      foreignKey:'ID',
      targetKey: 'User_ID'
  });
db.Board.Post.belongsTo(db.User.User,{
  foreignKey:'User_ID',
  targetKey: 'ID'
});
router.get('/',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({ success : false});
    db.Board.Post.findAll({
      where : {
        User_ID : decoded.id
      },
      include : [
        {
        model : db.User.User
        }
      ],
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
                },
                {
                  model : db.User.User
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