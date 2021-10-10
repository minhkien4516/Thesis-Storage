import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { FilesService } from '../files/files.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class MessagingService {
  constructor(
    private readonly storageService: StorageService,
    private readonly filesService: FilesService,
  ) {}

  @RabbitSubscribe({
    queue: 'storage',
    exchange: 'storage',
    routingKey: 'routing-key',
    queueOptions: {},
  })
  public async rpcHandler(msg: any, amqpMsg: ConsumeMessage) {
    const urls = await Promise.all(
      msg.files.map(async (file) => {
        const buf = Buffer.from(file.buffer);
        return await this.storageService.upload(buf, file.originalName);
      }),
    );

    await this.filesService.saveFile(msg.ownerId, urls);
  }
}
