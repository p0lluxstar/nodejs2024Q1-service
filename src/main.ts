import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* throw new Error('oops'); */
  const PORT = process.env.API_PORT || '4000';

  /*  await startSwagger(app); */
  const yamlDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, yamlDocument);

  await app.listen(PORT, () =>
    console.log(
      `\x1b[35mApplication is currently running on port: ${PORT}\x1b[0m`,
    ),
  );
}
bootstrap();
