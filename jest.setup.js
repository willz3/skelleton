/* eslint-disable no-undef, no-unused-vars */
// Configuração global para mockar loggers em todos os testes
// Mock console methods to suppress logs during tests
global.console = {
  ...console,
  // Mantém apenas os métodos que realmente precisamos ver durante os testes
  // log: jest.fn(),
  // error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  // Deixa os métodos de teste funcionais
  table: console.table,
  time: console.time,
  timeEnd: console.timeEnd,
  group: console.group,
  groupEnd: console.groupEnd,
  groupCollapsed: console.groupCollapsed,
};

// Mock global logger para NestJS
const mockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
  setContext: jest.fn(),
  localInstance: {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  },
};

// Configurar mock para winston logger se existir
try {
  const winston = require('winston');
  winston.createLogger = jest.fn().mockReturnValue(mockLogger);
} catch (error) {
  // Winston não está disponível, ignorar
}

// Configurar mock para nest-winston se existir
try {
  const nestWinston = require('nest-winston');
  nestWinston.WinstonModule = {
    createLogger: jest.fn().mockReturnValue(mockLogger),
    forRoot: jest.fn().mockReturnValue(mockLogger),
    forRootAsync: jest.fn().mockReturnValue(mockLogger),
  };
} catch (error) {
  // nest-winston não está disponível, ignorar
}

// Função utilitária para criar mock de logger para testes
global.createMockLogger = () => ({
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
});

// Limpar todos os mocks antes de cada teste
beforeEach(() => {
  jest.clearAllMocks();
});

// Restaurar mocks após cada teste
afterEach(() => {
  jest.restoreAllMocks();
}); 