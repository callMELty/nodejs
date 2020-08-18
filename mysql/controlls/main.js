const itemModel = require('../models/items');

module.exports = {
    getItem:async ctx => {
        let data = ctx.request.query;
        let items = await itemModel.getItems([
            data.time
        ]);
        ctx.body = items;
    },

    addItem:async ctx =>{
        let data = ctx.request.query;
        let rs = await itemModel.addItem([
            data.name,
            data.count,
            data.time,
            data.x,
            data.y,
            data.des
        ]);
        ctx.body = rs;
    },

    maxtimeItem:async ctx => {
        let items = await itemModel.maxtimeItem();
        ctx.body = items;
    },

    alltimeItem:async ctx => {
        let items = await itemModel.alltimeItem();
        ctx.body = items;
    }
}