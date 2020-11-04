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
router.get('/',(req,res) => {
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.User.User.findOne({
      where : {ID: decoded.id}
    }).then((data) =>{
      console.log(data.dataValues);
      if (data.dataValues.photo==null)
      {
        data.dataValues.photo=`https://api.lawbotc.kr/files/users/default.png`;
      }
      else
      {
        data.dataValues.photo=`https://api.lawbotc.kr/files/users/${data.dataValues.photo}.jpg`;
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
              res.json({success:true});
          }
       })
         db.User.User.update({
           photo: decoded.id
         },{where : {
          ID : decoded.id
        }})
      }
      else
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
              res.json({success:true});
          }
       })
      }
    })
  });
})
router.get('/favlawyer',(req,res)=>{
  db.Lawyer.Lawyer.hasMany(db.User.FavLawyer,
    {
        foreignKey:'Lawyer_ID'
    });
  db.User.FavLawyer.belongsTo(db.Lawyer.Lawyer,{
    foreignKey: 'Lawyer_ID'
  });
  db.Lawyer.Lawyer.belongsTo(db.User.User,
    {
        foreignKey:'ID'
    });
  db.User.User.belongsTo(db.Lawyer.Lawyer,{
    foreignKey: 'ID'
  });
  db.Lawyer.Lawyer.hasMany(db.Lawyer.LawyerField,
    {
        foreignKey:'Lawyer_ID'
    });
  db.Lawyer.LawyerField.belongsTo(db.Lawyer.Lawyer,{
    foreignKey: 'Lawyer_ID'
  });
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({ success : false});
    db.User.FavLawyer.findAll({
      attributes: ['User_ID','Lawyer_ID'],
      include: [
          {
              model:db.Lawyer.Lawyer,
              include: [
                {
                model : db.User.User,
                },
                {
                  model:db.Lawyer.LawyerField
                }
              ]  
          },
    ],
    where : {
      User_ID : decoded.id
    }
    }).then(posts => {
      res.json(posts);
    });
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