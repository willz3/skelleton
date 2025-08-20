/* eslint-disable no-undef */
const fs = require('fs')
 
const config = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8'))
 

module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { ...config, /* custom configuration in Jest */ }],
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s",
    "!**/*.spec.ts",           // Excluir arquivos de teste
    "!**/*.test.ts",           // Excluir arquivos de teste
    "!**/node_modules/**",     // Excluir node_modules
    "!**/dist/**",             // Excluir pasta de build
    "!**/coverage/**",         // Excluir pasta de coverage
    "!**/*.d.ts",              // Excluir arquivos de definição
    "!**/main.ts",             // Excluir arquivo principal
    "!**/index.ts",            // Excluir arquivos index
    "!**/*.make.ts",           // Excluir arquivos .make.ts
    "!**/protocols/**",        // Excluir pasta protocols
    "!**/*.repository.implementation.ts",  // Excluir implementações de repositórios
    "!**/*.error.ts",          // Excluir arquivos .error.ts
    "!**/*.module.ts",         // Excluir arquivos .module.ts
    "!**/docs.ts"              // Excluir arquivos docs.ts
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "\\.spec\\.ts$",
    "\\.test\\.ts$",
    "/main\\.ts$",
    "/index\\.ts$",
    "/prisma/",                // Excluir pasta do Prisma
    "/migrations/",            // Excluir migrações
    "\\.make\\.ts$",           // Excluir arquivos .make.ts
    "/protocols/",             // Excluir pasta protocols
    "\\.repository\\.implementation\\.ts$",  // Excluir implementações de repositórios
    "\\.error\\.ts$",          // Excluir arquivos .error.ts
    "\\.module\\.ts$",         // Excluir arquivos .module.ts
    "/docs\\.ts$"              // Excluir arquivos docs.ts
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node",
  "globalSetup": "<rootDir>/../jest.global-setup.js",
  "setupFilesAfterEnv": ["<rootDir>/../jest.setup.js"],
  "moduleNameMapper": {
    '^@/(.*)$': '<rootDir>/$1',
    '^@core/(.*)$': '<rootDir>/core/$1',
    '^@modules/(.*)$': '<rootDir>/modules/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@infra/(.*)$': '<rootDir>/infra/$1',
    '^@main/(.*)$': '<rootDir>/main/$1',
  },
  "reporters": [
    "default",
    ["jest-junit", {
      "outputDirectory": "reports",
      "outputName": "jest-junit.xml"
    }]
  ]
};
