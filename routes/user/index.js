const express = require('express');
const router = express.Router();
const fs = require('fs');
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
const multer = require('multer');
router.use('/interests', require('./interest.js'));
router.use('/judgement', require('./judgement.js'));
router.use('/posts',require('./posts.js'));
router.use('/favlawyer',require('./lawyer.js'));
router.use('/favqna',require('./favqa.js'));
router.use('/favpost',require('./favpost.js'));
router.use('/myquestion',require('./myquestion.js'));
router.use('/profile',require('./profile.js'));
router.get('/',(req,res) => {
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.User.User.findOne({
      where : {ID: decoded.id}
    }).then((data) =>{    
      res.json(data);
    })
  })
});
router.get('/laywer',(req,res)=>{

  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({ success : false});
    db.User.User.findOne({
      where : {ID: decoded.id}
    }).then((data) =>{
      if (data.lawyer===1)
      {
        res.json({success:true});
      }
      else
      {
        res.json({success:false});
      }
    })
  })
})
router.get('/:id',(req,res) => {

      db.User.User.findOne({
        where : {ID: req.params.id}
      }).then((data) =>{
        res.json(data);
      })})
router.get('/name/:id',(req,res)=>{
  db.User.User.findOne({
    attributes: ['userID'],
    where : {ID: req.params.id}
  })
  .then((data) => {
    res.json(data);
  })
})

module.exports = router;