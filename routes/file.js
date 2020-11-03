const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');
const fs = require('fs');
const DIR=process.env.FILESDIR;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.get('/:route/:filename',(req,res) => {
    fs.readFile(`${DIR}/${req.params.route}/${req.params.filename}`,'utf8', ((err,data)=>{
        if (err)
        {
            console.log(err);
            res.json({success:false});
        }
        else
        {
            res.sendFile(`${DIR}/${req.params.route}/${req.params.filename}`);
        }
    }));
});
router.post('/:route',upload.single('temp'),(req,res)=>{
    console.log(req.file.originalname);
    let file = req.file.buffer;
    fs.writeFile(`${DIR}/users/${req.file.originalname}`, file,{flag:'wx'} ,(err,data)=>{
        if (err)
        {
            console.log(err);
            res.json({success:false});
        }
        else
        {
            res.json({success:true});
        }
    })

})
module.exports = router;