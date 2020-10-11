const express = require('express');
const router = express.Router();
const db=require('../models/index.js');

router.post('/', (req, res) => {
    db.User.User.findOne({
      where: { userID: req.body.userID },
      order : [ ['ID','DESC']]
    })
    .then((user) => {
      if (user===null)
      {
        res.json({success:false});
      }
      else
      {
        if (user.dataValues.userPW==req.body.userPW)
        {
          res.json({success:true,id:user.dataValues.ID});
        }
        else
        {
          res.json({success:false});
        }
      }
  
    });
  });

module.exports = router;