const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');
router.post('/', (req, res) => {
    db.User.User.findOne({
      where: { userID: req.body.userID },
      order : [ ['ID','DESC']]
    })
    .then((user) => {
      if (user===null)
      {
        res.json({success:false});
      }
      else
      {
        if (user.dataValues.userPW==req.body.userPW)
        {
          console.log(user.dataValues);
          const p= jwt.sign(
            {
                id: user.dataValues.ID,
            }, 
            process.env.secret, 
            {
                expiresIn: '7d',
                issuer: 'lawbot',
                subject: 'userInfo'
            }, (err, token) => {
              console.log(token);
              res.json({success:true,id:user.dataValues.ID ,token:token});
          })
        }
        else
        {
          res.json({success:false});
        }
      }
  
    });
  });
router.get('/check',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    else
    {
      db.User.User.findAll({
        where : {
          ID : decoded.id
        }
      }).then((data)=>{
        if (data.length===0)
        {
          res.json({success:false,msg:"이미 탈퇴한 아이디입니다"});
        }
        else
        {
          res.json({success:true});
        }
      })
    }
  })
});
module.exports = router;