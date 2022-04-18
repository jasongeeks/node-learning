const Boom = require('boom');

const logger = require('../util/logging');

const notFoundHandler = (req, res, next) => next(Boom.notFound());

const errorHandler = (err, req, res, next) => {
  if (!Boom.isBoom(err)) Boom.boomify(err);
  logger.error(err.message, {
    fields: {
      url: req.originalUrl,
    },
  });
  res.status(err.output.statusCode || 500);
  res.json(err.output.payload);
};

module.exports = {
  notFoundHandler,
  errorHandler
};
