import Theme from '../models/Theme';
import createError from '../utils/createError';
import generateUniqueId from '../utils/generateUniqueId';
import config from '../config';

async function post(ctx) {
  if (!ctx.request.body) {
    return await Promise.reject(createError(400, 'Request body is null or undefined'));
  }

  const name = ctx.request.body.name;
  if (typeof name === 'undefined') {
    return await Promise.reject(createError(400, 'name is undefined'));
  }
  if (typeof name !== 'string') {
    return await Promise.reject(createError(400, 'name is not a string'));
  }
  if (name === '') {
    return await Promise.reject(createError(400, 'name is empty'));
  }

  const css = ctx.request.body.css;
  if (typeof css === 'undefined') {
    return await Promise.reject(createError(400, 'css is undefined'));
  }
  if (typeof css !== 'string') {
    return await Promise.reject(createError(400, 'css is not a string'));
  }
  if (css === '') {
    return await Promise.reject(createError(400, 'css is empty'));
  }

  return await new Promise((resolve, reject) => {
    Theme.find({ name }, async (err, themes) => {
      if (err) {
        return reject(createError(400, err));
      }

      if (Array.isArray(themes) && themes.length > 0) {
        return reject(createError(400, `The name "${name}" has already been taken, please use another name`));
      }

      const theme = new Theme({
        id: generateUniqueId(),
        name,
        css,
        created_at: new Date(),
      });

      return await theme.save().then((savedTheme) => {
        ctx.body = {
          url: `${config.api_origin}/pages/${savedTheme.id}`,
          html_url: `${config.html_origin}/pages/${savedTheme.id}`,
          id: savedTheme.id,
          name: savedTheme.name,
          css: savedTheme.css,
          created_at: savedTheme.created_at,
        };
        // 201 Created
        ctx.status = 201;
        return resolve();
      }, (error) => {
        return reject(createError(400, error.message));
      });
    });
  });
};

async function get(ctx) {
  return await new Promise((resolve, reject) => {
    Theme.find({}, (err, themes) => {
      if (err) {
        return reject(createError(400, err));
      }

      if (Array.isArray(themes) && themes.length > 0) {
        ctx.body = themes.map((theme) => {
          return {
            url: `${config.api_origin}/themes/${theme.id}`,
            html_url: `${config.html_origin}/themes/${theme.id}`,
            id: theme.id,
            name: theme.name,
            created_at: theme.created_at,
          };
        });
        return resolve();
      }

      return reject(createError(404, 'Not Found'));
    });
  });
};

export { post, get };
