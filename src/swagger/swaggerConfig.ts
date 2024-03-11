import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { join } from 'path';

const filePath = join(__dirname, '..', '..', 'doc', 'api.yaml');
const file = readFile(filePath, 'utf-8');

export const startSwagger = async (app: INestApplication) => {
  const swaggerDocument = parse(await file);
  SwaggerModule.setup('doc', app, swaggerDocument);
};
