import type { Config } from "jest";

const config: Config = {
    verbose: true,
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.ts"]
};

export default config;
