const express = require('express');
const router = express.Router();
const db=require('../models/index.js');

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
    db.Board.Post.findAll({
      where : {
        boardCategory : req.params.category
      },
      limit : 3,
      order : [
        ['ID','DESC']
      ]
    }).then((data)=>{
      res.json(data);
    })
  });


router.post('/write',(req,res) => {
db.Board.Post.create(req.body).then( result => {
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