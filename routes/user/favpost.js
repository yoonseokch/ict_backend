const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
router.get('/',(req,res)=>
{
    db.Board.Post.hasMany(db.User.FavPost , {
        foreignKey:'Board_ID'
    });
    db.User.FavPost.belongsTo(db.Board.Post, {
        foreignKey: 'Board_ID',
        targetKey: 'ID'
    });
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        db.User.FavPost.findAll({
            order : [['Board_ID','DESC']],
            include: [
                {
                    model:db.Board.Post,
                },
            ],
          where : {
            User_ID : decoded.id
          }
          }).then(posts => {
            res.json(posts);
    })});
});
router.delete('/',(req,res)=>{
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        db.User.FavPost.destroy({
          where : {
            User_ID : decoded.id,
            Board_ID : req.body.Board_ID
          }
        }).then((data)=>{
          if (data) res.json({success: true});
          else res.json({success:false});
        })
      })
})
router.post('/',(req,res)=>{
    var a={};
    a.Board_ID=req.body.Board_ID;
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
      a.User_ID=decoded.id;
    })
    db.User.FavPost.create(a).then(result=>{
      res.json({success:true});
    }).catch(err=>{
      res.json({success:false});
    })
})


module.exports = router;