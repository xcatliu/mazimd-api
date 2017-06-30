import Theme from '../../models/Theme';
import createError from '../../utils/createError';
import config from '../../config';
import getColorsFromString from '../../utils/getColorsFromString';

async function get(ctx) {
  const id = ctx.params.id;
  if (!id) {
    return await Promise.reject(createError(400, 'id is null or undefined'));
  }

  return await new Promise((resolve, reject) => {
    Theme.find({ id }, (err, themes) => {
      if (err) {
        return reject(createError(400, err));
      }

      if (Array.isArray(themes) && themes.length > 0) {
        ctx.body = {
          url: `${config.api_origin}/themes/${id}`,
          html_url: `${config.html_origin}/themes/${id}`,
          id: themes[0].id,
          name: themes[0].name,
          css: themes[0].css,
          colors: getColorsFromString(themes[0].css),
          created_at: themes[0].created_at,
        };
        return resolve();
      }

      return reject(createError(404, 'Not Found'));
    });
  });
};

export { get };
