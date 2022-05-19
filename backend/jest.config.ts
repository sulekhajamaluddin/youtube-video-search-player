/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch:['**/**/*.test.ts'],
  verbose:true,
  forceExit:true,
  clearMocks:true
};

export default jestConfig;