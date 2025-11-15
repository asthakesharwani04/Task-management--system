const { validationResult } = require("express-validator");

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extracted = errors
    .array()
    .map((err) => ({ param: err.param, msg: err.msg }));
  return res.status(400).json({ errors: extracted });
};