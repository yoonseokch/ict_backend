const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
db.Qna.Question.hasMany(db.Qna.Question_has_Category,
    {
        foreignKey:'Question_ID'
    });
db.Qna.Question_has_Category.belongsTo(db.Qna.Question,{
    foreignKey: 'Question_ID',
    targetKey: 'ID'
});
router.get('/',(req,res)=>{
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
      db.Qna.Question.findAll({
            order : [['writtenDate','DESC']],
            include: [
                {
                    model : db.Qna.Question_has_Category
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
router.get('/answer',(req,res)=>{
    db.Qna.Question.hasMany(db.Qna.Answer,
        {
            foreignKey:'Question_ID'
        });
    db.Qna.Answer.belongsTo(db.Qna.Question,
        {
            foreignKey: 'Question_ID',
            targetKey : 'ID'
        });
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        if (err) res.json({ success : false});
        db.Qna.Question.findAll(
            {
            include : [
                {
                model : db.Qna.Answer,
                where: {
                  Lawyer_ID : decoded.id
                }},
                {
                    model : db.Qna.Question_has_Category
                }
                
            ],
            order : [['ID','DESC']]
        }
        ).then((data)=>{
            res.json(data);
        })    
    })  
});

module.exports = router;