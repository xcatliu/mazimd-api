"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const config_1 = require("./config");
const connectMongoose_1 = require("./utils/connectMongoose");
const errorCatcher_1 = require("./middlewares/errorCatcher");
const cors_1 = require("./middlewares/cors");
const index_1 = require("./controllers/index");
const id_1 = require("./controllers/pages/id");
const pages_1 = require("./controllers/pages");
connectMongoose_1.default((err) => {
    if (err) {
        console.error(`connect to ${config_1.default.db} error: ${err.message}`);
        return process.exit(1);
    }
    console.log(`Successfully connect to ${config_1.default.db}`);
    const router = new Router();
    router.get('/', index_1.get);
    router.get('/pages/:id', id_1.get);
    router.options('/pages', (ctx) => { ctx.body = {}; });
    router.post('/pages', bodyParser(), pages_1.post);
    const app = new Koa();
    app.use(errorCatcher_1.default());
    app.use(cors_1.default());
    app.use(router.routes());
    app.listen(config_1.default.port, () => {
        console.log(`Server listening on 0.0.0.0 port ${config_1.default.port}`);
    });
});
