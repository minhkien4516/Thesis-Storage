import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('s3.accessKeyId'),
    secretAccessKey: configService.get('s3.secretAccessKey'),
    region: configService.get('s3.region'),
  });

  await app.listen(process.env.PORT || 3005);
}
bootstrap();
