import config from '../config';

function get(ctx) {
  ctx.body = {
    page_url: `${config.api_origin}/pages/{id}`,
    themes_url: `${config.api_origin}/themes{/id}`,
  };
};

export { get };
