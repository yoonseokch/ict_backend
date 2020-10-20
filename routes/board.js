const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');
router.get('/posts',(req,res)=>{
    db.Board.Post.findAll({
      order : [['ID','DESC']]
    })
    .then((data) => {
      res.json(data);
    });
});
router.get('/posts/:id',(req,res)=>{
    db.Board.Post.findOne({
      where: {ID:req.params.id}
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
    
    console.log(req.query); 
    if (req.query.limit)
    {
      if (req.query.limit!==NaN)
      {
        info.limit=parseInt(req.query.limit);
      }
    }
    info.order=[['ID','DESC']];
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
  a.writtenDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
    }).then(
    )
    res.json({success:true});
});


module.exports = router;