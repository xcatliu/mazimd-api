import Page from '../models/Page';
import createError from '../utils/createError';
import generateUniqueId from '../utils/generateUniqueId';
import expireStringMillisecondMap from '../utils/expireStringMillisecondMap';
import config from '../config';

const post = async (ctx) => {
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

  const expire_in = ctx.request.body.expire_in;
  if (typeof expire_in === 'undefined') {
    return await Promise.reject(createError(400, 'expire_in is undefined'));
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
    content: ctx.request.body.content,
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
  }, (error) => {
    return Promise.reject(createError(500, error.message));
  });
};

export { post };
