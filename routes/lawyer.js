const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');
db.Lawyer.Lawyer.hasMany(db.Lawyer.Qualification,{
    foreignKey: 'Lawyer_ID'
});
db.Lawyer.Qualification.belongsTo(db.Lawyer.Lawyer,{
    foreignKey:'Lawyer_ID',
    targetKey: 'ID'
    });
db.Lawyer.Lawyer.hasMany(db.Lawyer.Career,{
    foreignKey: 'Lawyer_ID'
});
db.Lawyer.Career.belongsTo(db.Lawyer.Lawyer,{
    foreignKey:'Lawyer_ID',
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
db.Lawyer.Lawyer.hasMany(db.Lawyer.Education,{
    foreignKey: 'Lawyer_ID'
});
db.Lawyer.Education.belongsTo(db.Lawyer.Lawyer,{
    foreignKey:'Lawyer_ID',
    targetKey: 'ID'
    });
db.Lawyer.Lawyer.hasMany(db.Lawyer.Activity,{
    foreignKey: 'Lawyer_ID'
});
db.Lawyer.Activity.belongsTo(db.Lawyer.Lawyer,{
    foreignKey:'Lawyer_ID',
    targetKey: 'ID'
    });
db.Lawyer.Lawyer.belongsTo(db.User.User,
    {
        foreignKey:'ID',
        targetKey: 'ID'
    });
db.User.User.belongsTo(db.Lawyer.Lawyer,{
foreignKey:'ID',
targetKey: 'ID'
});
db.Lawyer.Lawyer.hasMany(db.Lawyer.LawyerField,
{
    foreignKey:'Lawyer_ID'
});
db.Lawyer.LawyerField.belongsTo(db.Lawyer.Lawyer,{
foreignKey: 'Lawyer_ID',
targetKey : 'ID'
});
db.Lawyer.Lawyer.hasMany(db.Qna.Answer,{
    foreignKey: 'Lawyer_ID'
});
db.Qna.Answer.belongsTo(db.Lawyer.Lawyer,{
    foreignKey: 'Lawyer_ID',
    targetKey : 'ID'
});
db.Qna.Answer.belongsTo(db.Qna.Question,{
    foreignKey : 'Question_ID',
    targetKey : 'ID'
});
db.Qna.Question.hasMany(db.Qna.Answer,{
    foreignKey: 'Question_ID'
});
router.get('/answer/:id',(req,res)=>{
    db.Qna.Answer.findAll({
        where : {
            'Lawyer_ID' : req.params.id
        },
        include : {
            model : db.Qna.Question,
            include : {
                model : db.Qna.Question_has_Category
            }
        }
    }).then((data)=>{
        res.json(data);
    })
})
router.get('/',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({ success : false});
    db.Lawyer.Lawyer.findAll({
      include: [
            {
            model : db.User.User,
            },
            {
                model:db.Lawyer.LawyerField,
                attribute : ['Category_ID']
            }
    ],
    }).then(posts => {
      res.json(posts);
    });
  })
})
router.get('/:id',(req,res)=>{
    db.Lawyer.Lawyer.findAll({
        include: [
              {
              model : db.User.User,
              },
              {
                  model:db.Lawyer.LawyerField,
                  attribute : ['Category_ID']
              },
              {
                  model : db.Lawyer.Career
              },
              {
                model : db.Lawyer.Education
              },
              {
                  model: db.Lawyer.Activity
              },
              {
                  model : db.Lawyer.Qualification
              }
      ],      
      where : {
        ID : req.params.id
        }
      }).then(posts => {
        res.json(posts);
      });
})
module.exports = router;