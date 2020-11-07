const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');
const Sequelize=require('sequelize');
const Op = Sequelize.Op;
router.get('/answer/:id',(req,res)=>{
    db.Qna.Answer.belongsTo(db.Lawyer.Lawyer,{
        foreignKey: 'Lawyer_ID',
        targetKey : 'ID'
    })
    db.Lawyer.Lawyer.hasMany(db.Qna.Answer,{
        foreignKey : 'ID'
    })
    db.Lawyer.Lawyer.belongsTo(db.User.User,{
        foreignKey: 'ID',
        targetKey : 'ID'
    })
    db.User.User.belongsTo(db.Lawyer.Lawyer,{
        foreignKey: 'ID',
        targetKey : 'ID'
    })
    db.Qna.Answer.findAll({
        where : {
            Question_ID : req.params.id
        },
        include : {
            model : db.Lawyer.Lawyer,
            include : {
                    model : db.User.User
            }
        },
    }).then((data)=>{
        res.json(data);
    })
})
router.delete('/answer/:id',(req,res)=>{
    db.Qna.Answer.destroy({
        where : {
            ID : req.params.id
        }
    }).then((data)=>{
        if (data) res.json({success:true});
        else res.json({success:false});
    })
})
router.post('/answer',(req,res)=>{
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        var a={
            content : req.body.content,
            Lawyer_ID : decoded.id,
            Question_ID : req.body.Question_ID,
        }
        var today=new Date();
        var time1=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
        a.writtenDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+time1;
        console.log(a);
        db.Qna.Answer.create(a).then(()=>{
            res.json({success:true});
        }).catch((err)=>{
            console.log(err);
            res.json({success:false});
        });
    })
})
router.get('/question', async (req,res)=>{
    var tags=[];
    db.Qna.Question.findAll({
        order : [['writtenDate','DESC']]
    })
    .then(async (posts) => {
        const reqs = [];
    
        for (const post of posts)
        {
            reqs.push(
                db.Qna.Question_has_Category.findAll({
                    attributes: ['Category_ID'],
                    where : { Question_ID : post.dataValues.ID},
                    raw: true,
                })
            );
        }

        for(const [idx, post] of posts.entries()) {
            const tags = await reqs[idx];
            post.dataValues.tags = tags;
        }

        res.json({
            posts: posts
        });
    })
});
router.post('/question/search',(req,res)=>{
    if (req.body.kind=="키워드")
    {
        db.Qna.Question.hasMany(db.Qna.Question_has_Category,
            {
                foreignKey:'Question_ID'
            });
        db.Qna.Question_has_Category.belongsTo(db.Qna.Question,{
            foreignKey: 'Question_ID',
            targetKey: 'ID'
        });
        
        jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
            db.Qna.Question.findAll({
                order : [['writtenDate','DESC']],
                include: [
                    {
                        model: db.Qna.Question_has_Category,
                        attributes : ["Category_ID"]
                    },
              ],
              }).then(posts => {
                var data=[];
                for (var post of posts)
                {            
                    var a=false;
                    for (var i=0;i<post.Question_has_Categories.length;i++)
                    {
                        var next=post.Question_has_Categories[i].dataValues;
                
                        if (next.Category_ID==req.body.content)
                        {
                            a=true;
                        }
                    }
                    if (a)
                    {
                        post.dataValues.tags=post.Question_has_Categories;
                        data.push(post);
                    }
                }
                res.json({posts:data});
            });
        })
    }
    else if (req.body.kind=="제목")
    {
        db.Qna.Question.findAll({
            order : [['writtenDate','DESC']],
            where : {
                title: {
                [Op.substring] : req.body.content
            }}
        })
        .then(async (posts) => {
            const reqs = [];
        
            for (const post of posts)
            {
                reqs.push(
                    db.Qna.Question_has_Category.findAll({
                        attributes: ['Category_ID'],
                        where : { Question_ID : post.dataValues.ID},
                        raw: true,
                    })
                );
            }
    
            for(const [idx, post] of posts.entries()) {
                const tags = await reqs[idx];
                post.dataValues.tags = tags;
            }
    
            res.json({
                posts: posts
            });
        })
    }
    else
    {
        db.Qna.Question.findAll({
            order : [['writtenDate','DESC']],
            where : {
                content: {
                [Op.substring] : req.body.content
            }}
        })
        .then(async (posts) => {
            const reqs = [];
            const sleep = (ms) => {
                return new Promise(res => setTimeout(res, ms));
            }
        
            for (const post of posts)
            {
                reqs.push(
                    db.Qna.Question_has_Category.findAll({
                        attributes: ['Category_ID'],
                        where : { Question_ID : post.dataValues.ID},
                        raw: true,
                    })
                );
            }
    
            for(const [idx, post] of posts.entries()) {
                const tags = await reqs[idx];
                post.dataValues.tags = tags;
            }
    
            res.json({
                posts: posts
            });
        })
    }
})
router.delete('/question/:id',(req,res)=>{
    db.Qna.Question.destroy({
        where : {
            ID: req.params.id
        }
    }).then((result)=>{
        if (result)
        {
            res.json({
                success:true
            });
        }
        else
        {
            res.json({
                success:false
            });
        }
    })
});
router.get('/category',(req,res)=>{
    db.Qna.Category.findAll()
    .then((data)=>{
      res.json(data);
    });
});
router.post('/question',(req,res) => {
    console.log(req.body);
    var a=req.body.question;
    a.views=0;
    var today=new Date();
    var time1=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    a.writtenDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+time1;
    console.log(a.writtenDate);
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        if (err) res.json({success:false});
        a.User_ID=decoded.id;
    })
    db.Qna.Question.create(a).then( async (result) => {
        console.log(result.null);
        const reqs = [];
        for (const category of req.body.category)
        {
            var a={
                Category_ID : category,
                Question_ID : result.null,
            }
            reqs.push(
                db.Qna.Question_has_Category.create(a).then( result => {
                  })
            );
        }
        for(const [idx, post] of reqs.entries()) {
            const tags = await reqs[idx];
        }
        res.json({success:true});
    })
    .catch(err => {
        console.log(err);
      res.json({success: false});  
    })
});
module.exports = router;