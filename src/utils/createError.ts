export default (status, message) => {
  const error = new Error(message);
  return error;
};
