const assert = require('assert');
const Express = require('express');
const request = require('supertest');
const sinon = require('sinon');
const Boom = require('boom');
const logger = require('../util/logging');
const errorHandlers = require('./error-handlers');
const sandbox = sinon.createSandbox();

describe('Error Handlers', () => {
  describe('Not found handler', () => {
    it('returns a 404 for an unknown route', (done) => {
      const app = new Express();
      app.use(errorHandlers.notFoundHandler);
      app.use(errorHandlers.errorHandler);

      request(app).get('/unknown-route').expect(404, done);
    });
  });

  describe('Error handler', () => {
    beforeEach(() => {
      sandbox.stub(logger, 'error');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('converts normal errors into Boom errors', (done) => {
      const app = new Express();
      app.get('/boom', (req, res, next) =>
        next(new Error('Ooops this isnt boom'))
      );
      app.use(errorHandlers.errorHandler);

      request(app)
        .get('/boom')
        .expect(500)
        .end((err, res) => {
          assert.ifError(err);
          assert.deepEqual(res.body, {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred',
          });
          done();
        });
    });

    it('returns a 500 for an unknown error', (done) => {
      const app = new Express();
      app.get('/boom', (req, res, next) =>
        next(Boom.badImplementation('boom!'))
      );
      app.use(errorHandlers.errorHandler);

      request(app).get('/boom').expect(500, done);
    });

    it('returns the error code specified by status', (done) => {
      const app = new Express();
      app.get('/boom', (req, res, next) => {
        const err = Boom.badGateway('boom!');
        next(err);
      });
      app.use(errorHandlers.errorHandler);

      request(app).get('/boom').expect(502, done);
    });

    it('logs the error message', (done) => {
      const error = Boom.badImplementation('boom!');
      const app = new Express();
      app.get('/boom', (req, res, next) => {
        next(error);
      });
      app.use(errorHandlers.errorHandler);

      const extraFields = {
        fields: {
          url: '/boom?bucket=seaside',
        },
      };

      request(app)
        .get('/boom?bucket=seaside')
        .end((err) => {
          assert.ifError(err);
          sinon.assert.calledWith(logger.error, error.message, extraFields);
          done();
        });
    });
  });
});
