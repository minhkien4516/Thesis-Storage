import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FilesService } from './files.service';
import { FilesByOwnerId } from './interfaces/FilesByOwnerId.interface';
import { Observable } from 'rxjs';
import { File } from './entities/file.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly _filesService: FilesService) {}

  @GrpcMethod('FilesService', 'GetAllForOwner')
  getAllForOwner(data: FilesByOwnerId): Observable<Array<File>> {
    return this._filesService.getAllForOwner(data.ownerId);
  }
}
