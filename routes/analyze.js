const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');

router.post('/',(req,res)=>{
    
    const { PythonShell } = require("python-shell");
    console.log("!");
    console.log(req.body);
    let options = {
        scriptPath: process.env.HANIUMDIR,
        args: [req.body.purpose,req.body.cause,req.body.caseName,req.body.method]
      };
      PythonShell.run("tfidf.py", options, function(err, data) {
        if (err) throw err;
        console.log(data);
        res.json(JSON.parse(data));
      });

});
router.post('/login',(req,res)=>{
  jwt.verify(req.body.userID, process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    else
    {
      console.log(decoded); 
    }
})
});


  
module.exports = router;