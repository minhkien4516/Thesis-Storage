import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { from, map, mergeMap, toArray } from 'rxjs';

@Injectable()
export class StorageService {
  private readonly _bucket: string;
  private readonly s3: S3;

  constructor(configService: ConfigService) {
    this._bucket = configService.get('s3.bucket') || '';
    this.s3 = new S3();
  }

  upload(dataBuffer: Buffer, filename: string, mimetype: string) {
    return from(
      this.s3
        .upload({
          Bucket: this._bucket,
          Body: dataBuffer,
          Key: `${filename}-${new Date()}`,
          ACL: 'public-read',
          ContentDisposition: 'inline',
          ContentType: mimetype,
        })
        .promise(),
    ).pipe(map((result) => result.Location));
  }

  uploadMany(
    images: Array<{ filename: string; buffer: string; mimetype: string }>,
  ) {
    return from(images).pipe(
      mergeMap(
        ({ buffer, filename, mimetype }) =>
          this.upload(Buffer.from(buffer), filename, mimetype),
        images.length,
      ),
      toArray(),
    );
  }
}
