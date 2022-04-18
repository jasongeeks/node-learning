/* eslint-disable comma-dangle */

const config = {
  logging: {
    level: 'info',
    grappler: {
      serviceName: 'restful-demo',
      environment: 'prod'
    }
  },

  postgres: {
    host: 'localhost',
    database: 'api',
    port: 5432,
  },

  secrets: {
    jwt_password: 'password'
  },
};

module.exports = config;
