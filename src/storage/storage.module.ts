import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import s3Config from './storage.config';
import { StorageService } from './storage.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    ConfigModule.forFeature(s3Config),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
