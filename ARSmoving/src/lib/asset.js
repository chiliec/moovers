export const asset = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`;
