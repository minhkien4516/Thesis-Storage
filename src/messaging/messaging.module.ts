import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { StorageModule } from 'src/storage/storage.module';
import { StorageService } from 'src/storage/storage.service';
import { MessagingService } from './messaging.service';

@Module({
  imports: [
    FilesModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'storage',
          type: 'topic',
        },
      ],
      uri: 'amqps://xcmctebu:JL4f78Nnv8ViS9tCz6jOPRgOjYwYI2up@cattle.rmq2.cloudamqp.com/xcmctebu',
    }),
    MessagingModule,
    StorageModule,
  ],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
