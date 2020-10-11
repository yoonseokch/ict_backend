const Sequelize = require('sequelize');
const sequelize2= new Sequelize(
  process.env.DB_DB,
  process.env.DB_ID,
  process.env.DB_PW,
  {
    'host' : process.env.DB_HOST,
    'dialect' : 'mysql'
  }
);
const UserInterestCategory = sequelize2.define('UserInterestCategory',{
  User_ID : {
    type : Sequelize.INTEGER,
    primaryKey: true
  },
  Category_ID : {
    type : Sequelize.INTEGER,
    primaryKey: true
  }
},{freezeTableName: true,timestamps: false})
const Reply = sequelize2.define('Reply',{
  ID : {
    type : Sequelize.INTEGER,
    primaryKey : true
  },
  content : {
    type : Sequelize.STRING
  },
  writtenDate : {
    type : Sequelize.DATE
  },
  reports : {
    type : Sequelize.INTEGER
  },
  Post_ID : {
    type : Sequelize.INTEGER
  },
  User_ID : {
    type : Sequelize.INTEGER
  }
},{freezeTableName: true,timestamps: false})
const FavCase = sequelize2.define('FavCase',{
  User_ID : {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Precedent_ID : {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
},{freezeTableName: true,timestamps: false});
const user=sequelize2.define('User', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  userID: {
    type: Sequelize.STRING
  },
  userPW: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  name:
  {
      type: Sequelize.STRING
  },
  birth:
  {
      type:Sequelize.DATE
  },
  gender:
  {
      type:Sequelize.INTEGER
  },
  lawyer:
  {
      type:Sequelize.INTEGER
  },
  photo:
  {
    type:Sequelize.TEXT
  },
  phone:
  {
    type:Sequelize.STRING
  }
},{freezeTableName: true,timestamps: false});
const post=sequelize2.define('Post',{
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  User_ID: {
    type: Sequelize.INTEGER
  },
  boardCategory: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  content:
  {
      type: Sequelize.TEXT
  },
  writtenDate:
  {
      type: Sequelize.DATE
  },
  views:
  {
    type:Sequelize.INTEGER
  },
  reports:
  {
    type:Sequelize.INTEGER
  }
},{freezeTableName: true,timestamps: false});
const precedent = sequelize2.define('Precedent',{
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  caseName: {
    type: Sequelize.STRING
  }
},{freezeTableName: true,timestamps: false});
const express = require('express');
const app = express();
//app.use(express.urlencoded());
const axios = require('axios').default;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
app.use(express.json()); 
app.use(require('cors')());
app.get('/interests/:id',(req,res)=> {
  UserInterestCategory.findAll({
    where : {User_ID:req.params.id}
  }).then((data) => {
    res.json(data);
  }
)})
app.post('/interests/register',(req,res)=>{
  UserInterestCategory.create(req.body).then((data) => {
    res.json(data);
  })
})
app.delete('/interests',(req,res)=>{
  UserInterestCategory.destroy({
    where : {
      User_ID : req.body.User_ID,
      Category_ID: req.body.Category_ID
    }
  }).then((data)=>{
    res.json(data);
  })
})
app.get('/user/:id',(req,res) => {
  user.findOne({
    where : {ID: req.params.id}
  }).then((data) =>{
    res.json(data);
  })})
app.post('/user/register',(req,res) => {
  user.findAll({
    where : { userID : req.body.userID}
  }).then((data)=>
  {
    if (data.length===0)
    {
      console.log(data);
      user.create(req.body)
      .then((data)=>{
        res.json({success:true});
      }).catch((err)=>
      {
        res.json({success:false});
      })
    }
    else
    {
      res.json({success:false});
    }
  });
})
app.get('/main/boards/:category',(req,res)=>{
  post.findAll({
    where : {
      boardCategory : req.params.category
    },
    limit : 3,
    order : [
      ['ID','DESC']
    ]
  }).then((data)=>{
    res.json(data);
  })
})
app.get('/boards/posts',(req,res)=>{
 // console.log("hi");
  post.findAll({
    order : [['ID','DESC']]
  })
  .then((data) => {
   //console.log(data);
   res.json(data);
  }
  )
});
app.get('/reply/:id',(req,res)=>{
  Reply.findAll({
    where: {Post_ID:req.params.id}
  }).then(result=>{
    res.json(result);
  })
})
app.get('/boards/:id',(req,res)=>{
  //console.log(req.params.id);
  post.findOne({
    where: {ID:req.params.id}
  }).then(result=>{
    res.json(result);
  })
})
app.post('/boards/write',(req,res) => {
  post.create(req.body).then( result => {
    res.json({success:true});  
  })
  .catch( err => {
    res.json({success: false});  
  })
});
app.post('/reply/write',(req,res) => {
  Reply.create(req.body).then(result =>{
    res.json({success:true});
  })
});
app.post('/analyze/myjudgement',(req,res)=>
{
  console.log("hi");
  FavCase.create(req.body).then(result=>{
   // console.log(result);
    res.json({success:true});
  }).catch(err=>{
   // console.log(err);
    res.json({success:false});
  })
})
app.delete('/boards/:id',(req,res) =>{
  post.destroy({
    where : {ID : req.params.id}
  }).then(
  //  console.log("Hi")
  )
  res.json({success:true});
})

app.post('/apicall', upload.single('temp'),(req, res) => {
//
//  console.log(req.file);
  let file = req.file.buffer.toString('base64');
  var mimetype = req.file.mimetype.split("/");
  let data = {
      "version": "V1",
      "requestId": "test",
      "timestamp": 0,
      "images":
      [{
          "format": mimetype[mimetype.length - 1],
          "name": "tmp",
          "data": file,
      }]
  };
 
  // naver에다가 보내는 api
axios.post("https://571c51cbfe4f47808884e4a36286721d.apigw.ntruss.com/custom/v1/2609/4f1d71e2a236f959f6423ed2c5970e8799f7b9296f24a03b675a77d769f0ad87/general", data, {
      headers: {
          'Content-Type': 'application/json',
          'X-OCR-SECRET': 'SldleHFpZFBwVUJteHJvaEREVmRjcXdXUlVQdHFhTkE=',
      },
  }).then((result) => {
      var a=result.data;

      precedent.findAll({
        limit: 10
      }).then(result =>
      {
        a.ids=result;
        console.log(a);
        res.json(a);
      });
  }).catch((result) => {
//    console.log(result);
  });
  
});

app.post('/user/login', (req, res) => {
  user.findOne({
    where: { userID: req.body.userID },
    order : [ ['ID','DESC']]
  })
  .then((user) => {
    console.log(user.dataValues);
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

app.post('/apicall', upload.single('temp'), (req, res) => {
  let file = req.file.buffer.toString('base64');
  var mimetype = req.file.mimetype.split("/");
  let data = {
      "version": "V1",
      "requestId": "test",
      "timestamp": 0,
      "images":
      [{
          "format": mimetype[mimetype.length - 1],
          "name": "tmp",
          "data": file,
      }]
  };
 
  // naver에다가 보내는 api
axios.post("https://571c51cbfe4f47808884e4a36286721d.apigw.ntruss.com/custom/v1/2609/4f1d71e2a236f959f6423ed2c5970e8799f7b9296f24a03b675a77d769f0ad87/general", data, {
      headers: {
          'Content-Type': 'application/json',
          'X-OCR-SECRET': 'SldleHFpZFBwVUJteHJvaEREVmRjcXdXUlVQdHFhTkE=',
      },
  }).then((result) => {
      res.json(result.data);
  }).catch((result) => {
      console.log(result);
  });
  
});
app.listen(8080);
