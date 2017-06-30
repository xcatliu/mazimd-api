import Page from '../../models/Page';
import createError from '../../utils/createError';
import expireStringMillisecondMap from '../../utils/expireStringMillisecondMap';
import config from '../../config';

async function get(ctx) {
  const id = ctx.params.id;
  if (!id) {
    return await Promise.reject(createError(400, 'id is null or undefined'));
  }

  return await new Promise((resolve, reject) => {
    Page.find({ id }, (err, pages) => {
      if (err) {
        return reject(createError(400, err));
      }

      if (Array.isArray(pages) && pages.length > 0) {
        const result = generatePageAPIResult({
          id: pages[0].id,
          content: pages[0].content,
          created_at: pages[0].created_at,
          expire_in: pages[0].expire_in,
        });

        if (result instanceof Error) {
          return reject(result);
        }
        
        ctx.body = result;
        return resolve();
      }

      return reject(createError(404, 'Not Found'));
    });
  });
};

function generatePageAPIResult({ id, content, created_at, expire_in }) {
  const createdDateNumber = Number(created_at);
  const currentDateNumber = Number(new Date());
  const expireNumber = expireStringMillisecondMap[expire_in];

  if (createdDateNumber + expireNumber < currentDateNumber) {
    return createError(404, 'Resource has expired');
  }

  return {
    url: `${config.api_origin}/pages/${id}`,
    html_url: `${config.html_origin}/pages/${id}`,
    id,
    content,
    created_at,
  };
}

export { get };
