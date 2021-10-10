import { Inject, Injectable } from '@nestjs/common';
import { File } from 'src/entities/file.entity';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: typeof File,
  ) {}
  async saveFile(ownerId, urls) {
    await this.fileRepository.bulkCreate<File>(
      urls.map((url) => {
        const id = uuidV4();
        return { id, ownerId, url };
      }),
    );
  }
}
