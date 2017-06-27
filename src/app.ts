import * as path from 'path';

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as renderer from 'koa-hbs-renderer';
import * as mount from 'koa-mount';
import * as Router from 'koa-router';
import * as serveStatic from 'koa-static';

import config from './config';

import connectMongoose from './utils/connectMongoose';

import errorCatcher from './middlewares/errorCatcher';

import { post as postApiPages } from './controllers/api/pages';
import { get as getPagesId } from './controllers/pages/id';

connectMongoose((err) => {
  if (err) {
    console.error(`connect to ${config.db} error: ${err.message}`);
    return process.exit(1);
  }

  console.log(`Successfully connect to ${config.db}`);

  const router = new Router();
  router.get('/', (ctx) => ctx.render('index'));
  router.get('/pages/new', (ctx) => ctx.render('pages/new', {
    css: [
      '/public/css/font-awesome-4.7.0/css/font-awesome.min.css',
      '/public/css/simplemde-theme-base/simplemde-theme-base.min.css',
      '/public/css/new.css',
    ],
  }));
  router.get('/pages/:id', getPagesId);
  router.post('/api/pages', bodyParser(), postApiPages);

  const app = new Koa();
  app.use(renderer({
    paths: {
      views: path.resolve(__dirname, 'views'),
      partials: path.resolve(__dirname, 'views/partials'),
    },
  }));
  app.use(errorCatcher());
  app.use(mount('/public', serveStatic('./lib/public')));
  app.use(router.routes());

  app.listen(config.port, () => {
    console.log(`Server listening on 0.0.0.0 port ${config.port}`);
  });
});
