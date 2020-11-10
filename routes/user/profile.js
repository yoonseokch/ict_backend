const express = require('express');
const router = express.Router();
const fs = require('fs');
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
const multer = require('multer');
const fetch=require('node-fetch');
const DIR=process.env.FILESDIR;
const upload = multer({ storage: multer.memoryStorage() });
router.put(`/image`,upload.single('temp'),(req,res)=>{
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
router.put('/password',(req,res)=>{
  if (req.body.newPassword[0]!==req.body.newPassword[1])
  {
    res.json({success:false,msg:"두개의 새로운 비밀번호가 일치하지 않습니다"});
  }
  else if (req.body.prevPassword===req.body.newPassword[0])
  {
    res.json({success:false,msg:""});
  }
  else
  {
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
      db.User.User.findOne({
        where : {
          ID : decoded.id
        }
      }).then((data)=>{
        if (data.dataValues.userPW===req.body.prevPassword)
        {
          db.User.User.update({userPW: req.body.newPassword[0]},{where :{
            ID : decoded.id
          }}).then(result => {
            res.json({success:true});
          })
          .catch(err => {
            res.json({success:false,msg:""})
          });
        }
        else
        {
          res.json({success:false,msg:"기존의 비밀번호와 일치하지 않는 비밀번호입니다"});
        }
      })
    })
  }
})
router.put('/introduction',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.User.User.update({introduction: req.body.introduction},{where :{
      ID : decoded.id
    }}).then(result => {
      res.json({success:true});
    })
    .catch(err => {
      res.json({success:false,msg:"프로필 업데이트에 실패했습니다"});
    });
  })
})
router.put('/lawyer/introduction',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.Lawyer.Lawyer.update({introduction: req.body.introduction},{where :{
      ID : decoded.id
    }}).then(result => {
      res.json({success:true});
    })
    .catch(err => {
      res.json({success:false,msg:"프로필 업데이트에 실패했습니다"});
    });
  })
})
router.post('/lawyer/education',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    req.body.Lawyer_ID=decoded.id;
    db.Lawyer.Education.create(req.body).then( result => {
      res.json({success:true});  
    })
  .catch(err => {
      res.json({success: false});  
  })
  })
});
router.delete('/lawyer/education',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.Lawyer.Education.destroy({
      where : {
        Lawyer_ID : decoded.id,
        detail : req.body.detail
      }
    }).then( result => {
      if (result)
      {
        res.json({success:true});
      }
      else
      {
        res.json({success:false});
      }
    })
  })
});
router.post('/lawyer/career',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    req.body.Lawyer_ID=decoded.id;
    db.Lawyer.Career.create(req.body).then( result => {
      res.json({success:true});  
    })
  .catch(err => {
      res.json({success: false});  
  })
  })
});
router.delete('/lawyer/career',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.Lawyer.Career.destroy({
      where : {
        Lawyer_ID : decoded.id,
        detail : req.body.detail
      }
    }).then( result => {
      if (result)
      {
        res.json({success:true});
      }
      else
      {
        res.json({success:false});
      }
    })
  })
});
router.post('/lawyer/activity',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    req.body.Lawyer_ID=decoded.id;
    db.Lawyer.Activity.create(req.body).then( result => {
      res.json({success:true});  
    })
  .catch(err => {
      res.json({success: false});  
  })
  })
});
router.delete('/lawyer/activity',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    db.Lawyer.Activity.destroy({
      where : {
        Lawyer_ID : decoded.id,
        detail : req.body.detail
      }
    }).then( result => {
      if (result)
      {
        res.json({success:true});
      }
      else
      {
        res.json({success:false});
      }
    })
  })
});
module.exports = router;