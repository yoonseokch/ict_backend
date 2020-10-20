const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const fetch=require('node-fetch');
router.post('/',(req,response) => {
    let description1="결과를 찾을수 없습니다";
    console.log(req.body);
    let data = encodeURIComponent(req.body.data);
    new Promise((resolve, reject)=> {
        let url = "https://openapi.naver.com/v1/search/encyc?query=" + data +"&display=3&sort=count";
        fetch(url, {
            method: "GET",
            headers: {
            "X-Naver-Client-Id" : "Akn5Y7uO9AQNtb21Xm6c",
            "X-Naver-Client-Secret" : "JnMgYfLhJE"
            }
        })
        .then(res=>{
            if(res.status !== 200)
                return {};

            return res.json();
        }).then(json => {
            const DICTIONARIES = {
                "법률용어사전": "cid=42131",
                "두산백과": "cid=40942",
            };
            let index = -1;
            let dict = "";
            var found=false;
            for(index=0;index< json.items.length;index++) {
                for(let [key, val] of Object.entries(DICTIONARIES)) {
                    if(json.items[index].link.indexOf(val) != -1) {
                        found=true;
                        break;
                    }
                }

                if(found)
                    break;
            }

            index=0;
            fetch(json.items[index].link,
            {
                method: 'GET',
            }).then(res => {
                return res.text();
            })
            .then(res1 => {
                const parser=require('node-html-parser');
                const root = parser.parse(res1);
                const summary = root.querySelector('.summary_area');
                const descriptions = root.querySelectorAll('.txt');
                let description = '';
                for(let k of descriptions) {
                    description += k.text;
                }
            //   console.log(summary);
                if (found)
                {
                description1=description;
                }
                console.log(description)
            }).then(()=>{
                response.json({data:description1});
            });
        })
    })
})
module.exports = router;