const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
router.post('/check',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    db.User.FavQA.findAll({
      where : {
        User_ID : decoded.id,
        Question_ID : req.body.Question_ID
      }
    }).then((data)=>{
      if (data.length==0)
      {
        res.json({success:false});
      }
      else
      {
        res.json({success:true});
      }
    })
  })
})
router.post('/',(req,res)=>
{
  var a={};
  a.Question_ID=req.body.Question_ID;
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    a.User_ID=decoded.id;
  })
  db.User.FavQA.create(a).then(result=>{
    res.json({success:true});
  }).catch(err=>{
    res.json({success:false});
  })
});
router.delete('/',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    db.User.FavQA.destroy({
      where : {
        User_ID : decoded.id,
        Question_ID : req.body.Question_ID
      }
    }).then((data)=>{
      if (data) res.json({success: true});
      else res.json({success:false});
    })
  })
})
router.get('/',(req,res)=>{
    db.Qna.Question.hasMany(db.User.FavQA,
        {
            foreignKey:'Question_ID'
        });
    db.User.FavQA.belongsTo(db.Qna.Question,{
        foreignKey: 'Question_ID',
        targetKey: 'ID'
    });
    db.Qna.Question.hasMany(db.Qna.Question_has_Category,
        {
            foreignKey:'Question_ID'
        });
    db.Qna.Question_has_Category.belongsTo(db.Qna.Question,{
        foreignKey: 'Question_ID',
        targetKey: 'ID'
    });
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
      db.User.FavQA.findAll({
            order : [['Question_ID','DESC']],
            include: [
                {
                    model:db.Qna.Question,
                    include : [
                        {
                        model : db.Qna.Question_has_Category
                        }
                    ]
                },
          ],
          where : {
            User_ID : decoded.id
          }
          }).then(posts => {
            res.json(posts);
        });
    })
})


module.exports = router;