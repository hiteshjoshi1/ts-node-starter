// jest.config.js
// module.exports = {
//     transform: {
//         "^.+\\.tsx?$": "ts-jest",
//     },
//     testPathIgnorePatterns: ["/build/", "/node_modules/"],
//     testRegex: "/__tests__/.*\\.test\\.ts$",
//     moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//     globals: {
//         "ts-jest": {
//             diagnostics: {
//                 // Do not fail on TS compilation errors
//                 // https://kulshekhar.github.io/ts-jest/user/config/diagnostics#do-not-fail-on-first-error
//                 warnOnly: true,
//             },
//         },
//     },
//     testEnvironment: "node",
// };

module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
        },
    },
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: ["**/test/**/*.test.(ts|js)"],
    testEnvironment: "node",
};
