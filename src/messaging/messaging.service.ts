import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { mergeMap } from 'rxjs';
import { FilesService } from '../files/files.service';
import { StorageService } from '../storage/storage.service';
import { FilesUploadRequestDto } from './dtos/filesUploadRequestDto';

@Injectable()
export class MessagingService {
  constructor(
    private readonly _storageService: StorageService,
    private readonly _filesService: FilesService,
  ) {}

  @RabbitRPC({
    queue: 'storage',
    exchange: 'storage',
    routingKey: 'storage.routing-key',
    queueOptions: {
      durable: false,
      autoDelete: true,
    },
  })
  public uploadRequestHandler(message: FilesUploadRequestDto) {
    this._storageService
      .uploadMany(message.files)
      .pipe(
        mergeMap((urls) => this._filesService.saveFile(message.ownerId, urls)),
      )
      .subscribe();
  }
}
