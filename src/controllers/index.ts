import config from '../config';

const get = (ctx) => {
  ctx.body = {
    page_url: `${config.api_origin}/pages/{id}`,
  };
};

export { get };
