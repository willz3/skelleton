import * as winston from 'winston';

const { combine, timestamp, errors, printf } = winston.format;

const transports: winston.transport[] = [
  // Console logs formatados
  new winston.transports.Console({
    format: combine(
      timestamp(),
      errors({ stack: true }),
      printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
      }),
    ),
  }),
];

export const winstonLogger = {
  transports,
};
