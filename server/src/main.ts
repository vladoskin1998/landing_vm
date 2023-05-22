import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', 'https://prod.com'],
    methods: 'GET,POST,DELETE',
  });
  await app.listen(5001);
}
bootstrap();
