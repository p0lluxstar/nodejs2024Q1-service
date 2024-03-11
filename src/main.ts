import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startSwagger } from './swagger/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await startSwagger(app);

  await app.listen(4000, () =>
    console.log(`\x1b[35mApplication is running on port: 4000\x1b[0m`),
  );
}
bootstrap();
