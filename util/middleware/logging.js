const winston = require('winston');
const WinstonGrappler = require('winston-grappler').default;
const config = require('../../config/config');

const initLogging = () => {
  const env = process.env.NODE_ENV || 'development';

  let transports;
  if (env === 'test') {
    transports = [];

  } else if (env === 'development') {
    transports = [new winston.transports.Console()];

  } else if (config.logging.grappler) {
    transports = [new WinstonGrappler(config.logging)];

  }

  winston.configure({ transports });
};

module.exports = {
  initLogging,
  info: winston.info,
  warn: winston.warn,
  error: winston.error,
  debug: winston.debug,
};
