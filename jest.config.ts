module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!src/WriterT.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "test",
  moduleFileExtensions: ["ts", "js"],
  setupFiles: ["<rootDir>/tests/helpers/test-setup.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  modulePathIgnorePatterns: ["util", "helpers"],
};
