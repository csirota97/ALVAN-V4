// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  coverageDirectory: 'tests/jest/reports/coverage',
  setupTestFrameworkScriptFile: 'jestSetup.js', 
  transform: {
    "^.+\\.scss$": 'jest-scss-transform',
  }
};

module.exports = config;

// Or async function
module.exports = async () => {
  return {
    verbose: true,
    coverageDirectory: 'tests/jest/reports/coverage',
    moduleNameMapper: {
      "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
      "\\.(css|less)$": "<rootDir>/mocks/fileMock.js"
    }
  };
};