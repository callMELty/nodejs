
// 引入node内置的fs模块，来完成对应文件系统（硬盘里面的文件）进行操作
const koa = require('koa');
const koaRouter = require('koa-router');
const cors = require('koa-cors');
const mainController = require('./mysql/controlls/main');
const server = new koa();
const router = new koaRouter();
server.use(cors(),function(ctx,next){
  next();
});
const express = require("express");
const app = express();

//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})


// router.get('/river',async(ctx,next) => {
//     let dbData = await db(ctx.request.query.time);
//     ctx.body = dbData;
// })
// router.get('/time',async(ctx,next) => {
//   let dbData = await dbTime();
//   ctx.body = dbData;
// })
// router.get('/alltime',async(ctx,next) => {
//   let dbData = await dbAllTime();
//   ctx.body = dbData;
// })
// router.get('/insert',async(ctx,next) => {
//   console.log(ctx.request);
//   let dbData = await db2(ctx.request.query);
//   ctx.body = dbData;
// })

router.get('/river',mainController.getItem);
router.get('/time',mainController.maxtimeItem);
router.get('/alltime',mainController.alltimeItem);
router.get('/insert',mainController.addItem);


let routerMiddleKey = router.routes();

server.use(routerMiddleKey);

server.listen(802);