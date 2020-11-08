const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');

router.post('/',(req,res)=>{
    
    const { PythonShell } = require("python-shell");
    let options = {
        scriptPath: process.env.LAWRDIR,
        args: [req.body.tags]
      };
      PythonShell.run("lawyer_recommand.py", options, function(err, data) {
        if (err) throw err;
        console.log(data);
        res.json(JSON.parse(data));
      });

});
  
module.exports = router;