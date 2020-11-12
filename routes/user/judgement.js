const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');
const jwt=require('jsonwebtoken');
router.post('/check',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    db.User.FavCase.findAll({
      attributes : ['User_ID','Precedent_ID'],
      where : {
        User_ID : decoded.id,
        Precedent_ID : req.body.Precedent_ID
      }
    }).then(result=>{
   //   console.log(result);
      if (result.length===0)
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
  a.Precedent_ID=req.body.Precedent_ID;
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    a.User_ID=decoded.id;
  })
  console.log(a);
  db.User.FavCase.create(a).then(result=>{
    res.json({success:true});
  }).catch(err=>{
    res.json({success:false});
  })
});
router.delete('/',(req,res)=>{
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    db.User.FavCase.destroy({
      where : {
        User_ID : decoded.id,
        Precedent_ID : req.body.Precedent_ID
      }
    }).then((data)=>{
      if (data) res.json({success: true});
      else res.json({success:false});
    })
  })
})
router.get('/',(req,res)=>{
    db.Precedent.Precedent.hasMany(db.User.FavCase,
        {
            foreignKey:'ID'
        });
    db.User.FavCase.belongsTo(db.Precedent.Precedent,{
        foreignKey: 'Precedent_ID'
    });
    
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
      db.User.FavCase.findAll({
            attributes: ['User_ID','Precedent_ID'],
            include: [
                {
                    model:db.Precedent.Precedent, 
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