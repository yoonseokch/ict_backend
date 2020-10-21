const port = process.env.PORT || 8080;
const db = require('./models/index.js');
const jwt=require('jsonwebtoken');
const express = require('express');
const app = express();
//app.use(express.urlencoded());
const axios = require('axios').default;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
app.use(express.json()); 
app.use(require('cors')());
app.use('/login', require('./routes/login.js'));
app.use('/register', require('./routes/register.js'));
//app.use('/test', require('./routes/test.js'));
app.use((req, res, next) => {
  console.log(req.headers['token']);
  jwt.verify(req.headers['token'], process.env.secret, (err, decoded) => {
    if (err) res.json({success:false});
    
    console.log(decoded);
  })
	next();
});
app.use('/boards',require('./routes/board.js'));
app.use('/reply', require('./routes/reply.js'));
app.use('/user',  require('./routes/user/index'));
app.use('/interpret',require('./routes/interpret.js'));
app.post('/apicall1', upload.single('temp'),(req, res) => {
  let file = req.file.buffer.toString('base64');
  var mimetype = req.file.mimetype.split("/");
  let data = {
    "version": "V1",
    "requestId": "test",
    "timestamp": 0,
    "images":
    [
      {
        "format": mimetype[mimetype.length - 1],
        "name": "tmp",
        "data": file,
      },
    ],
  };
 
  // naver에다가 보내는 api
  axios.post("https://571c51cbfe4f47808884e4a36286721d.apigw.ntruss.com/custom/v1/2609/4f1d71e2a236f959f6423ed2c5970e8799f7b9296f24a03b675a77d769f0ad87/general", data, {
    headers: {
      'Content-Type': 'application/json',
      'X-OCR-SECRET': process.env.NAVER_TOKEN,
    },
  }).then((result) => {
    let a=result.data;

    db.Precedent.Precedent.findAll({
      limit: 10
    }).then(result =>
    {
      a.ids=result;
      res.json(a);
    });
  }).catch((result) => {
    console.log(result);
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
      [
        {
          "format": mimetype[mimetype.length - 1],
          "name": "tmp",
          "data": file,
        },
      ],
  };
 
  // naver에다가 보내는 api
  axios.post("https://571c51cbfe4f47808884e4a36286721d.apigw.ntruss.com/custom/v1/2609/4f1d71e2a236f959f6423ed2c5970e8799f7b9296f24a03b675a77d769f0ad87/general", data, {
    headers: {
      'Content-Type': 'application/json',
      'X-OCR-SECRET': process.env.NAVER_TOKEN,
    },
  }).then((result) => {
    res.json(result.data);
  }).catch((result) => {
    console.log(result);
  });
  
});

app.use((req, res, next) => {
	res.status(404).send("요청하신 페이지는 존재하지 않습니다.");
});

app.listen(port, () => {
	console.log("Express server has started on port " + port);
});
