import Page from '../../models/page';
import createError from '../../utils/createError';
import generateUniqueId from '../../utils/generateUniqueId';

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

  const page = new Page({
    id: generateUniqueId(),
    content: ctx.request.body.content,
  });

  return await page.save().then((savedPage) => {
    ctx.body = {
      id: savedPage.id,
      content: savedPage.content,
    };
  }, (error) => {
    return Promise.reject(createError(500, error.message));
  });
};

export { post };
