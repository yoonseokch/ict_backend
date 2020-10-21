const express = require('express');
const router = express.Router();
const db=require('../models/index.js');
const fetch=require('node-fetch');
router.post('/',(req,response) => {
    var description1=``;
    fetch(`https://www.law.go.kr/LSW/lsTrmInfoR.do?&lsTrm=${encodeURI(req.body.query)}`)
    .then(data=>{
        return data.text();
    }).then(data=>{
        const parser=require('node-html-parser');
        const root = parser.parse(data);
        const src = root.querySelector('dd');
        if (src===null)
        {
            let data = encodeURIComponent(req.body.query);
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
                    if (!found)
                    {
                        response.json({data:""});
                    }
                    else
                    {
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
                        if (found)
                        {
                        description1=description;
                        }
                    }).then(()=>{
                        response.json({data:description1});
                    });
                }
                })
            })
        }
        else
        {
            const dir=root.querySelector('h3');
            if (dir.text==="법령한영사전")
            {
                let data = encodeURIComponent(req.body.query);
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
                        if (!found)
                        {
                            response.json({data: ""});
                        }
                        else
                        {
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
                        }).then(()=>{
                            response.json({data:description1});
                        });
                    }
                    })
                })
            }
            else
            {
                response.json({data: src.text.trim()});
            }
        }
    })

})
module.exports = router;