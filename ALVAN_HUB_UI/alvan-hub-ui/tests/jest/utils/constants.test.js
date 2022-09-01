import 'jsdom-global/register';
import getConstants from '../../../src/js/utils/constants';

describe('Constants', () => {
  const env = process.env;
  
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  });

  afterEach(() => {
    process.env = env
  });

  it('should have the correct dev server url', () => {
    process.env.NODE_ENV = 'development'
    const constants = getConstants();
    expect(constants.SERVER_URL).toBe('http://localhost:5001/');
  });

  it('should have the correct test server url', () => {
    process.env.NODE_ENV = 'test'
    const constants = getConstants();
    expect(constants.SERVER_URL).toBe('http://localhost:5001/');
  });

  it('should have the correct prod server url', () => {
    process.env.NODE_ENV = 'production'
    const constants = getConstants();
    expect(constants.SERVER_URL).toBe('https://server.ALVANPROJECT.com/');
  });
});