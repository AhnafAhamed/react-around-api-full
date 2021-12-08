const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer', '');

  let payload;

  try {
    payload = jwt.verify(token, 'JWT Token');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization Required' });
  }

  req.user = payload;

  next();
  return payload;
};