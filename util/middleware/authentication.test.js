const Express = require('express');
const request = require('supertest');
const moment = require('moment');
const config = require('../config/config');
const { authenticate } = require('./authentication');


const getAuthHeader = (payload = {}) => {
  const tokenPayload = _.defaults(payload, {
    name: 'accruals',
  });

  return {
    authorization: jwt.sign(tokenPayload, 'secret'),
  };
};

const boomErrorHandler = (err, req, res, next) => {
  res.sendStatus(err.output.statusCode);
};

describe('.authenticate', () => {
  it('allows access if validation passes', () => {
    const app = new Express();
    app.get('/boom', authenticate, (req, res) => res.json('success!'));
    app.use(boomErrorHandler);

    return request(app).get('/boom').set(getAuthHeader()).expect(200);
  });

  it('allows access if an exp is specified', () => {
    const app = new Express();
    app.get('/boom', authenticate, (req, res) => res.json('success!'));
    app.use(boomErrorHandler);

    return request(app)
      .get('/boom')
      .set(getAuthHeader({ exp: moment().add(1, 'day').unix() }))
      .expect(200);
  });

  it('denies access if token is not valid', async () => {
    const secret = config.secrets.accruals_jwt_password;
    config.secrets.accruals_jwt_password = 'notright';

    const app = new Express();
    app.get('/boom', authenticate, (req, res) => res.json('success!'));
    app.use(boomErrorHandler);

    await request(app).get('/boom').set(getAuthHeader()).expect(401);

    config.secrets.accruals_jwt_password = secret;
  });

  it('denies access if token is expired', () => {
    const app = new Express();
    app.get('/boom', authenticate, (req, res) => res.json('success!'));
    app.use(boomErrorHandler);

    return request(app)
      .get('/boom')
      .set(getAuthHeader({ exp: moment().subtract(1, 'day').unix() }))
      .expect(401);
  });

  it('allows access if environment is development', async () => {
    process.env.NODE_ENV = 'development';

    const app = new Express();
    app.get('/boom', authenticate, (req, res) => res.sendStatus(200));
    app.use(boomErrorHandler);

    await request(app).get('/boom').expect(200);

    process.env.NODE_ENV = 'test';
  });
});
