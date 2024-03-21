import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startSwagger } from './swagger/swaggerConfig';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.API_PORT || '4000';

  /* await startSwagger(app); */

  await app.listen(PORT, () =>
    console.log(
      `\x1b[35mApplication is currently running on port: ${PORT}\x1b[0m`,
    ),
  );
}
bootstrap();
