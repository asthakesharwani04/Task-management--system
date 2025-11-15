module.exports = (err, req, res, next) => {

  console.error('--- Express ERROR ---');
  console.error(err && err.stack ? err.stack : err);
  console.error('--- /Express ERROR ---');

  const isProd = process.env.NODE_ENV === 'production';
  const message = isProd ? 'Internal server error' : (err && err.message ? err.message : 'Unknown error');
  const stack = isProd ? undefined : (err && err.stack ? err.stack : undefined);

  const payload = { message };
  if (stack) payload.stack = stack;

  res.status(err.status || 500).json(payload);
};