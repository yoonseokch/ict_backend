const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
router.use('/interests', require('./interest.js'));
router.use('/judgement', require('./judgement.js'));
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
router.get('/favlawyer',(req,res)=>{
  db.Lawyer.Lawyer.hasMany(db.User.FavLawyer,
    {
        foreignKey:'ID'
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
        foreignKey:'ID'
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