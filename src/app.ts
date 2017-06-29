import * as path from 'path';

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';

import config from './config';

import connectMongoose from './utils/connectMongoose';

import errorCatcher from './middlewares/errorCatcher';
import cors from './middlewares/cors';

import { get as getIndex } from './controllers/index';
import { get as getPagesId } from './controllers/pages/id';
import { post as postPages } from './controllers/pages';

connectMongoose((err) => {
  if (err) {
    console.error(`connect to ${config.db} error: ${err.message}`);
    return process.exit(1);
  }

  console.log(`Successfully connect to ${config.db}`);

  const router = new Router();
  router.get('/', getIndex);
  router.get('/pages/:id', getPagesId);
  router.post('/pages', cors(), bodyParser(), postPages);

  const app = new Koa();

  app.use(errorCatcher());
  app.use(router.routes());

  app.listen(config.port, () => {
    console.log(`Server listening on 0.0.0.0 port ${config.port}`);
  });
});
