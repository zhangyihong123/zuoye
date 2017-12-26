/**
 * Created by hp on 2017/11/27.
 */
var express = require('express');
var bodyparser = require('body-parser');
var static = require('express-static');
var fs = require('fs');
var server = express();
server.listen(6666,function(){
    console.log('server start!!')
})

server.use(bodyparser.urlencoded({}))
server.use('/abc',function(req,res,next){
    console.log(req.body)
    fs.readFile('/zyh.txt','utf-8',function(err,data){
        if(err)throw err;
        var json = JSON.parse(data);
        var json1 = req.body;
        if(json[json1.user]){
            res.send('用户已注册')
        }else{
            json[json1.user]=json1.pass;
            console.log(json)
            fs.writeFile('./zyh.txt',JSON.stringify(json),function(err){})
                if(err)throw err;
            res.send('注册成功')
        }
    })
})

server.use('/asd',function(req,res,next){
    console.log(req,body)
    fs.readFile('./zyh.txt','utf8',function(err,data){
        var json = JSON.parse(data);
        var json1 = req.body;
        if(json[json1.user] == json1.pass){
            res.send('登陆成功')
        }else{
            res.send('登录失败')
        }
    })
})

server.use('/list',function(req,res,next){
    fs.readFile('./say.txt','utf8',function(err,data){
        if(err) throw err;
        var json = JSON.parse(data);
        var json1 = req.body;
        json[json1.inp1] = json1.con;
        console.log(json)
        fs.writeFile('./say.txt',JSON.stringify(json),function(err){
            if(err) throw err;
            res.send(json)
        })
    })

})

server.use(static('./zyh'))