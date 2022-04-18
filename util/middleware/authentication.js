const Boom = require('boom');
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const logger = require('./logging');

authenticate = (req, res, next) => {
  if (process.env.NODE_ENV === 'development')
    return next();
  try {
    jwt.verify(
      req.headers.authorization,
      config.secrets.jwt_password,
      {
        ignoreExpiration: false,
      }
    );
    return next();
  } catch (err) {
    logger.error(err.message);
    return next(Boom.unauthorized());
  }
};

module.exports = authenticate;
