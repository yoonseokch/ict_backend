const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
db.Lawyer.Lawyer.belongsTo(db.User.FavLawyer,{
  foreignKey: 'ID',
  targetKey : 'Lawyer_ID'
});
db.User.FavLawyer.belongsTo(db.Lawyer.Lawyer,{
  foreignKey: 'Lawyer_ID',
  targetKey : 'ID'
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
router.get('/',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({ success : false});
    db.User.FavLawyer.findAll({
      attributes: ['User_ID','Lawyer_ID'],
      include: [
          {
              model:db.Lawyer.Lawyer,
              include: [
                {
                model : db.User.User,
                },
                {
                  model:db.Lawyer.LawyerField
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
router.post('/',(req,res)=>{
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        if (err) res.json({success:false});
        var a={
            User_ID : decoded.id,
            Lawyer_ID : req.body.Lawyer_ID
        }
        db.User.FavLawyer.create(a).then((data)=>{
            res.json({success:true});
        }).catch((err)=>{
            res.json({success:false});
        })
    });
})
router.delete('/',(req,res)=>{
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
        if (err) res.json({success:false});
        var a={
            User_ID : decoded.id,
            Lawyer_ID : req.body.Lawyer_ID
        }
        db.User.FavLawyer.destroy({
            where : {
                User_ID : decoded.id,
                Lawyer_ID : req.body.Lawyer_ID
            }
        }).then((data)=>{
            if (data) res.json({success:true});
            else res.json({success:false});
        })
    });
})
module.exports = router;