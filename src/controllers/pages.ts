import Page from '../models/Page';
import createError from '../utils/createError';
import generateUniqueId from '../utils/generateUniqueId';
import expireStringMillisecondMap from '../utils/expireStringMillisecondMap';
import config from '../config';

async function post(ctx) {
  if (!ctx.request.body) {
    return await Promise.reject(createError(400, 'Request body is null or undefined'));
  }

  const content = ctx.request.body.content;
  if (typeof content === 'undefined') {
    return await Promise.reject(createError(400, 'content is undefined'));
  }
  if (typeof content !== 'string') {
    return await Promise.reject(createError(400, 'content is not a string'));
  }
  if (content === '') {
    return await Promise.reject(createError(400, 'content is empty'));
  }

  let expire_in = ctx.request.body.expire_in;
  if (typeof expire_in === 'undefined') {
    expire_in = 'forever';
  }
  if (typeof expire_in !== 'string') {
    return await Promise.reject(createError(400, 'expire_in is not a string'));
  }
  if (expire_in === '') {
    return await Promise.reject(createError(400, 'expire_in is empty'));
  }
  if (Object.keys(expireStringMillisecondMap).indexOf(expire_in) === -1) {
    return await Promise.reject(createError(400, 'expire_in is not acceptable'));
  }

  const page = new Page({
    id: generateUniqueId(),
    content,
    created_at: new Date(),
    expire_in,
  });

  return await page.save().then((savedPage) => {
    ctx.body = {
      url: `${config.api_origin}/pages/${savedPage.id}`,
      html_url: `${config.html_origin}/pages/${savedPage.id}`,
      id: savedPage.id,
      content: savedPage.content,
      created_at: savedPage.created_at,
    };
    // 201 Created
    ctx.status = 201;
  }, (error) => {
    return Promise.reject(createError(500, error.message));
  });
};

export { post };
