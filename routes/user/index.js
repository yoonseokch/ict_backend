const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
router.use('/interests', require('./interest.js'));
router.post('/judgement',(req,res)=>
{
  var a={};
  a.Precedent_ID=req.body.Precedent_ID;
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    
    console.log(decoded);
    a.User_ID=decoded.id;
  })
  console.log(a);
  db.User.FavCase.create(a).then(result=>{
    res.json({success:true});
  }).catch(err=>{
    res.json({success:false});
  })
});
router.get('/:id',(req,res) => {
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.User.User.findOne({
      where : {ID: decoded.id}
    }).then((data) =>{
      res.json(data);
    })
  })
  });

module.exports = router;