const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');

router.get('/:id',(req,res)=> {
    const jwt=require('jsonwebtoken');
    jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
      if (err) res.json({success:false});
      
      db.User.UserInterestCategory.findAll({
        where : {User_ID:decoded.id}
      }).then((data) => {
        res.json(data);
      }
  )
    })
});
  
router.post('/',(req,res)=>{
db.User.UserInterestCategory.create(req.body).then((data) => {
    res.json(data);
})
});

router.delete('/',(req,res)=>{
db.User.UserInterestCategory.destroy({
    where : {
    User_ID : req.body.User_ID,
    Category_ID: req.body.Category_ID
    }
}).then((data)=>{
    res.json(data);
})
});

module.exports = router;