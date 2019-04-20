import queryString from 'query-string';
import base64url from 'base64-url';

export const getData = (key: string) => {
  const query = queryString.parse(window.parent.location.search);
  return query[key] && base64url.decode(query[key]);
};

export const saveData = (key: string, value: string) => {
  const query = queryString.parse(window.parent.location.search);
  const newQuery = queryString.stringify({
    ...query,
    [key]: base64url.encode(value),
  });
  window.parent.history.replaceState(
    null,
    null,
    `${window.parent.location.origin}?/${newQuery}`,
  );
};
