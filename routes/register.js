const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY, secretAccessKey: process.env.AWS_SECRETACCESSKEY, region: 'ap-northeast-1'
})

const validateNum = {};
const validatedNum = [];
router.post('/',(req,res) => {
    if (!(validatedNum.includes(req.body.phone)))
    {
      res.json({success:false, msg:"정일님 그만하세요"});
    }
    else
    {
    db.User.User.findAll({
      where : { userID : req.body.userID}
    }).then((data)=>
    {
      if (data.length===0)
      {
        req.body.photo="https://api.lawbotc.kr/files/users/default.png";
        db.User.User.create(req.body)
        .then((data)=>{
          res.json({success:true});
          const idx = validatedNum.indexOf(req.body.phone);
          if (idx > -1) validatedNum.splice(idx, 1);
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
  }
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
router.post('/phone-validate',(req,res) => {
  console.log(process.env.AWS_SDK_LOAD_CONFIG);
  console.log(AWS.config.credentials);
  db.User.User.findAll({
    where : {
      phone :req.body.phone
    }
  }).then((data)=>{
    if (data.length==0)
    {
      if(req.body.phone) {
        let phoneNum = req.body.phone.replace(/-/g, "");
    
        let randomNum = ((min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        })(1000, 9999);
    
        if(req.body.phone in validateNum) {
          clearTimeout(validateNum[req.body.phone][1]);
          validateNum[req.body.phone][0] = randomNum;
        }else {
          validateNum[req.body.phone] = [randomNum, -1];
        }
    
        validateNum[req.body.phone][1] = setTimeout(() => { 
          if(req.body.phone in validateNum) {
            delete validateNum[req.body.phone];
          }
        }, 180000);
    
        let params = {
          Message: "[로우봇] 인증번호 [" + randomNum.toString() + "]를 입력해주세요.",
          PhoneNumber: '+82' + phoneNum,
        };
    
        const publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    
        publishTextPromise.then(
          function(data) {
            res.json({ success: true });
          }).catch(
            function(err) {
              console.error(err, err.stack);
              res.json({ success: false, msg: "" });
          });
      }else {
        res.json({ success: false, msg: ""});
      }
    }
    else
    {
      res.json({success:false,msg:"이미 있는 휴대폰 번호입니다"});
    }
  })
});
router.post('/phone-check', (req, res) => {
  if(req.body.phone && req.body.phone in validateNum) {
    if(validateNum[req.body.phone][0] === req.body.validateNum) {
      res.json({ success: true });
      validatedNum.push(req.body.phone);
    }else {
      res.json({ success: false });
    }
  }else {
    res.json({ success: false });
  }
});
module.exports = router;