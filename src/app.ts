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

import { get as getThemesId } from './controllers/themes/id';
import { post as postThemes, get as getThemes } from './controllers/themes';

connectMongoose((err) => {
  if (err) {
    console.error(`connect to ${config.db} error: ${err.message}`);
    return process.exit(1);
  }

  console.log(`Successfully connect to ${config.db}`);

  const router = new Router();
  router.get('/', getIndex);

  router.get('/pages/:id', getPagesId);
  router.options('/pages', (ctx) => { ctx.body = '' });
  router.post('/pages', bodyParser(), postPages);

  router.get('/themes/:id', getThemesId);
  router.options('/themes', (ctx) => { ctx.body = '' });
  router.post('/themes', bodyParser(), postThemes);
  router.get('/themes', getThemes);

  const app = new Koa();

  app.use(errorCatcher());
  app.use(cors());
  app.use(router.routes());

  app.listen(config.port, () => {
    console.log(`Server listening on 0.0.0.0 port ${config.port}`);
  });
});
