const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const jwt=require('jsonwebtoken');
const Sequelize=require('sequelize');
router.post('/',(req,res)=>{
    
    const { PythonShell } = require("python-shell");
    let options = {
        scriptPath: process.env.LAWRDIR,
        args: [req.body.tags]
      };
      PythonShell.run("lawyer_recommand.py", options, function(err, data) {
        if (err) throw err;
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
        let a=[];
        console.log(JSON.parse(data));
        for (var i=0;i<JSON.parse(data).length;i++)
        {
          a.push(JSON.parse(data)[i][0]);
        }
        db.Lawyer.Lawyer.findAll({
          include : [{
            model : db.User.User
          },{
            model : db.Lawyer.LawyerField
          }],
          where: {
            ID: {
              [Sequelize.Op.in]: a
            }
          }
        }).then((data)=>{
          res.json(data);
        })
      });

});
  
module.exports = router;