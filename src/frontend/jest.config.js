import { defaults } from 'jest-config';

/** @type {import('jest').Config} */
const config = {
  collectCoverage: true, // --coverage
  coverageReporters: [
    ...defaults.coverageReporters,
    "html"
  ],
  transform: {},
  verbose: true // --verbose
};
export default config;
