const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');
const Sequelize=require('sequelize');
const Op = Sequelize.Op;
router.get('/question',(req,res)=>{
    var tags=[];
    db.Qna.Question.findAll({
        order : [['writtenDate','DESC']]
    })
    .then(async (posts) => {
        const finished = new Array(posts.length);
        for(let i=0; i<posts.length; i++) finished[i] = false;
    
        for (const [idx, post] of posts.entries())
        {
            db.Qna.Question_has_Category.findAll({
                attributes: ['Category_ID'],
                where : { Question_ID : post.dataValues.ID}
            }).then((data)=>{
                tags[idx] = data
            });
        }
        setTimeout(()=>{
            res.json({
                posts:posts,
                tags : tags
            });
        },200)
    })
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
            },
        },
        order : [['writtenDate','DESC']]
        })
        .then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.send(err);
        })
    }
    else
    {
    db.Qna.Question.findAll({
        where : {
            content: {
            [Op.substring] : req.body.content
        },
    },  order : [['writtenDate','DESC']]
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
    var time1=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    a.writtenDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+time1;
    console.log(a.writtenDate);
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        if (err) res.json({success:false});
        a.User_ID=decoded.id;
    })
    db.Qna.Question.create(a).then( result => {
      res.json({success:true});  
    })
    .catch(err => {
        console.log(err);
      res.json({success: false});  
    })
});
module.exports = router;