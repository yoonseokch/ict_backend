const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
router.get('/',(req,res)=>{
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


module.exports = router;