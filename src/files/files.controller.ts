import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { FilesService } from './files.service';
import { GetAllForOwnerRequest } from './interfaces/getAllForOwnerRequest.interface';
import { GetAllForOwnerResponse } from './interfaces/getAllForOwnerResponse.interface';

@Controller('files')
export class FilesController {
  constructor(private readonly _filesService: FilesService) {}

  @GrpcMethod('FilesService', 'GetAllForOwner')
  getAllForOwner(
    data: GetAllForOwnerRequest,
  ): Observable<GetAllForOwnerResponse> {
    return this._filesService
      .getAllForOwner(data.ownerId)
      .pipe(map((files) => ({ files })));
  }
}
