const logging = require('./logging');
const winston = require('winston');

describe('initLogging', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('should have no loggers in test environment', () => {
    const winstonConfigure = spyOn(winston, 'configure');

    logging.initLogging();

    expect(winstonConfigure).toHaveBeenCalledWith({
      transports: [],
    });
  });

  it('should have single console logger in development environment', () => {
    process.env.NODE_ENV = 'development';
    const winstonConfigure = spyOn(winston, 'configure');

    logging.initLogging();

    expect(winstonConfigure).toHaveBeenCalled();

    const winstonConfiguration = winstonConfigure.calls.argsFor(0)[0];

    expect(winstonConfiguration.transports.length).toEqual(1);
    expect(winstonConfiguration.transports[0].name).toEqual('console');
  });

  it('should have single grappler logger in prod environment', () => {
    process.env.NODE_ENV = 'production';
    const winstonConfigure = spyOn(winston, 'configure');

    logging.initLogging();

    expect(winstonConfigure).toHaveBeenCalled();

    const winstonConfiguration = winstonConfigure.calls.argsFor(0)[0];

    expect(winstonConfiguration.transports.length).toEqual(1);
    expect(winstonConfiguration.transports[0].name).toEqual('grappler-sdk');
  });
});
