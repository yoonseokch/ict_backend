const express = require('express');
const router = express.Router();
const db=require('../models/index.js');

router.post('/',(req,res) => {
    db.User.User.findAll({
      where : { userID : req.body.userID}
    }).then((data)=>
    {
      if (data.length===0)
      {
        db.User.User.create(req.body)
        .then((data)=>{
          res.json({success:true});
        }).catch((err)=>
        {
          res.json({success:false});
        })
      }
      else
      {
        res.json({success:false});
      }
    });
  });
  router.post('/check',(req,res) => {
    db.User.User.findAll({
      where : { userID : req.body.userID}
    }).then((data)=>
    {
      if (data.length===0)
      { 
        res.json({success:true});
      }
      else
      {
        res.json({success:false});
      }
    });
  });
module.exports = router;