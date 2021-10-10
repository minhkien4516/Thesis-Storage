import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { filesProvider } from './files.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService, ...filesProvider],
  exports: [FilesService, ...filesProvider],
})
export class FilesModule {}
