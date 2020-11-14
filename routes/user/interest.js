const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
db.Lawyer.Lawyer.hasMany(db.Lawyer.LawyerField,
  {
      foreignKey:'Lawyer_ID'
  });
db.Lawyer.LawyerField.belongsTo(db.Lawyer.Lawyer,{
  foreignKey: 'Lawyer_ID',
  targetKey : 'ID'
});
router.get('/',(req,res)=> {
    const jwt=require('jsonwebtoken');
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
      if (err) res.json({success:false});
      
      db.User.UserInterestCategory.findAll({
        where : {User_ID:decoded.id}
      }).then((data) => {
        res.json(data);
      }
  )
    })
});
  
router.post('/',(req,res)=>{
  const jwt=require('jsonwebtoken');
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.User.UserInterestCategory.create({User_ID:decoded.id,Category_ID:req.body.Category_ID})
    .then((data) => {
      res.json({success:true});
  }).catch((err)=>{
    res.json({success:false});
  })
})

});

router.delete('/',(req,res)=>{
  const jwt=require('jsonwebtoken');
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.User.UserInterestCategory.destroy({
      where : {
      User_ID : decoded.id,
      Category_ID: req.body.Category_ID
      }
  }).then((data)=>{
      if (data) res.json({success:true});
      else res.json({success:false});
  })
  }
)

});
router.post('/lawyer',(req,res)=>{
  const jwt=require('jsonwebtoken');
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.Lawyer.LawyerField.create({Lawyer_ID:decoded.id,Category_ID:req.body.Category_ID})
    .then((data) => {
      res.json({success:true});
  }).catch((err)=>{
    res.json({success:false});
  })
})

});
router.delete('/lawyer',(req,res)=>{
  const jwt=require('jsonwebtoken');
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.Lawyer.LawyerField.destroy({
      where : {
      Lawyer_ID : decoded.id,
      Category_ID: req.body.Category_ID
      }
  }).then((data)=>{
      if (data) res.json({success:true});
      else res.json({success:false});
  })
  }
)

});

module.exports = router;