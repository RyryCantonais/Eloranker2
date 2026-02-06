import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();            // Autorise le Frontend à se connecter
  app.setGlobalPrefix('api');  // Ajoute /api devant toutes les routes

  await app.listen(3333);
}
bootstrap();