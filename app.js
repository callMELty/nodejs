
// 引入node内置的fs模块，来完成对应文件系统（硬盘里面的文件）进行操作
const fs = require('fs');
const url = require('url');
const koa = require('koa');
const koaRouter = require('koa-router');
const cors = require('koa-cors');
const db = require('./data/db.js');
const db2 = require('./data/db2.js');
const dbTime = require('./data/dbTime.js');
const dbAllTime = require('./data/dbAllTime.js');
const server = new koa();
const router = new koaRouter();
server.use(cors(),function(ctx,next){
  next();
});

router.get('/river',async(ctx,next) => {
    let dbData = await db(ctx.request.query.time);
    ctx.body = dbData;
})
router.get('/time',async(ctx,next) => {
  let dbData = await dbTime();
  ctx.body = dbData;
})
router.get('/alltime',async(ctx,next) => {
  let dbData = await dbAllTime();
  ctx.body = dbData;
})
router.get('/insert',async(ctx,next) => {
  console.log(ctx.request);
  let dbData = await db2(ctx.request.query);
  ctx.body = dbData;
})

let routerMiddleKey = router.routes();

server.use(routerMiddleKey);

server.listen(802);