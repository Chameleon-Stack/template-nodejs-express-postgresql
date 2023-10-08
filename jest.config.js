module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  test: 'jest --coverage',
  'test:watch': 'jest --watch',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/**/infra/http/controllers/**/*.ts',
    '<rootDir>/src/modules/**/**/services/**/*.ts',
    '<rootDir>/src/modules/**/**/providers/**/implementations/*.ts',
    '<rootDir>/src/modules/**/**/infra/**/repositories/*.ts',
    '<rootDir>/src/shared/providers/**/implementations/*.ts',
  ],
  testMatch: [
    '<rootDir>/src/modules/**/__test__/*.spec.ts',
    '<rootDir>/src/modules/**/__test__/**/*.spec.ts',
    '<rootDir>/src/modules/**/**/__test__/*.spec.ts',
    '<rootDir>/src/modules/**/**/__test__/**/*.spec.ts',
    '<rootDir>/src/modules/**/**/__test__/**/**/*.spec.ts',
    '<rootDir>/src/shared/__test__/**/**/*.spec.ts',
  ],
};
