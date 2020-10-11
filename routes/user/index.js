const express = require('express');
const router = express.Router();
const db=require('../../models/index.js');

router.use('/interests', require('./interest.js'));
router.post('/judgement',(req,res)=>
{
  db.User.FavCase.create(req.body).then(result=>{
   // console.log(result);
    res.json({success:true});
  }).catch(err=>{
   // console.log(err);
    res.json({success:false});
  })
});
router.get('/:id',(req,res) => {
    db.User.User.findOne({
      where : {ID: req.params.id}
    }).then((data) =>{
      res.json(data);
    })
  });

module.exports = router;