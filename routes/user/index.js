const express = require('express');
const router = express.Router();
const fs = require('fs');
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
const multer = require('multer');
const fetch=require('node-fetch');
const DIR=process.env.FILESDIR;
const upload = multer({ storage: multer.memoryStorage() });
router.use('/interests', require('./interest.js'));
router.use('/judgement', require('./judgement.js'));
router.use('/posts',require('./posts.js'));
router.use('/favlawyer',require('./lawyer.js'));
router.get('/',(req,res) => {
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.User.User.findOne({
      where : {ID: decoded.id}
    }).then((data) =>{
      if (data.dataValues.photo==null)
      {
        data.dataValues.photo=`https://api.lawbotc.kr/files/users/default.png`;
      }      
      res.json(data);
    })
  })
});
router.put(`/profile`,upload.single('temp'),(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.User.User.findOne({
      where : {
        ID : decoded.id
      }
    }).then((data)=>{
      console.log(data.dataValues);
      if (data.dataValues.photo===null)
      {
        let file = req.file.buffer;
        fs.writeFile(`${DIR}/users/${decoded.id}.jpg`, file ,(err,data)=>{
          if (err)
          {
              console.log(err);
              res.json({success:false});
          }
          else
          {
              res.json({success:true, uri : `https://api.lawbotc.kr/files/users/${decoded.id}.jpg` });
          }
       })
         db.User.User.update({
           photo: `https://api.lawbotc.kr/files/users/${decoded.id}.jpg`
         },{where : {
          ID : decoded.id
        }})
      }
      else
      {
        console.log(req);
        let file = req.file.buffer;
        fs.writeFile(`${DIR}/users/${decoded.id}.jpg`, file ,(err,data)=>{
          if (err)
          {
              console.log(err);
              res.json({success:false});
          }
          else
          {
              res.json({success:true, uri : `https://api.lawbotc.kr/files/users/${decoded.id}.jpg` });
          }
       })
      }
    })
  });
})
router.get('/posts',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({ success : false});
    db.Board.Post.findAll({
      where : {
        User_ID : decoded.id
      }
    }).then((data)=>{
      res.json(data);
    })    
  })  
})
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