const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');

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
      res.json(data);
  })})

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
      res.json(data);
  })
  }
)

});

module.exports = router;