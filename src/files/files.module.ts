import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { filesProvider } from './files.provider';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, ...filesProvider],
  exports: [FilesService, ...filesProvider],
})
export class FilesModule {}
