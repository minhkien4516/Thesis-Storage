import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { map } from 'rxjs';
import { FilesService } from './files.service';
import { FilesByOwnerId } from './interfaces/FilesByOwnerId.interface';

@Controller('files')
export class FilesController {
  constructor(private readonly _filesService: FilesService) {}

  @GrpcMethod('FilesService', 'GetAllForOwner')
  getAllForOwner(data: FilesByOwnerId) {
    return this._filesService
      .getAllForOwner(data.ownerId)
      .pipe(map((files) => ({ files })));
  }
}
