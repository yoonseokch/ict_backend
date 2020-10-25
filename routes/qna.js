const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');
const Sequelize=require('sequelize');
const Op = Sequelize.Op;
router.get('/question',(req,res)=>{
    db.Qna.Question.findAll({
        order : [['ID','DESC']]
    })
    .then((data) => {
      res.json(data);
    });
});
router.post('/question/search',(req,res)=>{
    if (req.body.kind=="키워드")
    {

    }
    else if (req.body.kind=="제목")
    {
        db.Qna.Question.findAll({
            where : {
                title: {
                [Op.substring] : req.body.content
            }
        }
        })
        .then((data)=>{
            res.json(data);
        })
    }
    else
    {
    db.Qna.Question.findAll({
        where : {
            content: {
            [Op.substring] : req.body.content
        }
    }
    })
    .then((data)=>{
        res.json(data);
    })
    }
})
router.get('/category',(req,res)=>{
    db.Qna.Category.findAll()
    .then((data)=>{
      res.json(data);
    });
});
router.post('/question',(req,res) => {
    console.log(req.body);
    var a=req.body;
    a.views=0;
    var today=new Date();
    a.writtenDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        if (err) res.json({success:false});
        a.User_ID=decoded.id;
    })
    db.Qna.Question.create(a).then( result => {
      res.json({success:true});  
    })
    .catch(err => {
      res.json({success: false});  
    })
});
module.exports = router;