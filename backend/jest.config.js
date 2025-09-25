module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["**/test/**/*.spec.ts"],
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.{d.ts}"],
};
