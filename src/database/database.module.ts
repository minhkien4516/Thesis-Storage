import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
