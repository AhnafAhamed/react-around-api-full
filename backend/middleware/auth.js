const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    console.log({ token });
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    console.log(payload);
  } catch (err) {
    // throw new AuthorizationError('Not authorizedg');
    console.log(err);
  }

  req.user = payload;

  return next();
};

module.exports = auth;
