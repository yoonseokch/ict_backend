const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');

router.get('/:id',(req,res)=> {
    db.User.UserInterestCategory.findAll({
      where : {User_ID:req.params.id}
    }).then((data) => {
      res.json(data);
    }
)});
  
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