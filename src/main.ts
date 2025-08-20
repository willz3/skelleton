import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { MicroserviceCoreBankingModule } from './app.module';
import {
  AllExceptionsFilter,
  setupCors,
  validationPipe,
  setupSwagger,
  TransformInterceptor,
} from '@/main/configs';

// Carrega o arquivo .env correto baseado no NODE_ENV
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

// validateEnvVars();

async function bootstrap() {
  const app = await NestFactory.create(MicroserviceCoreBankingModule);
  setupCors(app);
  setupSwagger(app);
  app.useGlobalPipes(validationPipe);
  app.useGlobalInterceptors(new TransformInterceptor());
  // Must be initialized after the TransformInterceptor
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
