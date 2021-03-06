const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');
const Sequelize=require('sequelize');
const Op = Sequelize.Op;
db.User.User.belongsTo(db.Board.Post,
  {
      foreignKey:'ID',
      targetKey: 'User_ID'
  });
db.Board.Post.belongsTo(db.User.User,{
  foreignKey:'User_ID',
  targetKey: 'ID'
});
router.post('/posts/search',(req,res)=>{
  if (req.body.kind=="제목")
  {
    db.Board.Post.findAll({
      order : [['writtenDate','DESC']],
      where : {
          title: {
          [Op.substring] : req.body.content
      }},
      include : [
        {
          model : db.User.User
        }
      ]
    }).then((data)=>{
      res.json(data);
    })
  }
  else if(req.body.kind=="내용")
  {
    db.Board.Post.findAll({
      order : [['writtenDate','DESC']],
      where : {
          content: {
          [Op.substring] : req.body.content
      }},
      include : [
        {
          model : db.User.User
        }
      ]
    }).then((data)=>{
      res.json(data);
    })
  }
  else
  {
    res.json({
      success: false,
      msg: "잘못된 접근입니다"
    })
  }
})
router.get('/posts',(req,res)=>{
    db.Board.Post.findAll({
      order : [['ID','DESC']],
      include : [
        {
          model : db.User.User
        }
      ]
    })
    .then((data) => {
      res.json(data);
    });
});
router.get('/posts/:id',(req,res)=>{
    db.Board.Post.findOne({
      where: {ID:req.params.id},
      include : [
        {
          model : db.User.User
        }
      ]
    }).then(result=>{
      res.json(result);
    })
  });
router.get('/:category',(req,res)=>{
    const info = {
      where : {
        boardCategory : req.params.category
      }
    };
    if (req.query.limit)
    {
      if (req.query.limit!==NaN)
      {
        info.limit=parseInt(req.query.limit);
      }
    }
    info.order=[['ID','DESC']];
    info.include={model : db.User.User};
    db.Board.Post.findAll(info).then((data)=>{
      res.json(data);
    })
  });


router.post('/write',(req,res) => {
  var a=req.body;
  a.views=0;
  a.reports=0;
  
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    a.User_ID=decoded.id;
  })
  var today=new Date();
  var time1=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
  a.writtenDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+time1;
  console.log(a.writtenDate);
  db.Board.Post.create(a).then( result => {
    res.json({success:true});  
  })
.catch(err => {
    res.json({success: false});  
})
});

router.delete('/:id',(req,res) =>{
    db.Board.Post.destroy({
      where : {ID : req.params.id}
    }).then((data)=>{
    if (data) res.json({success:true});
    else res.json({success:false});
  });
});


module.exports = router;