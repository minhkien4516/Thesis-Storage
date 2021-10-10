import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class StorageService {
  private readonly _bucket: string;
  private readonly s3: S3;

  constructor(configService: ConfigService) {
    this._bucket = configService.get('s3.bucket') || '';
    this.s3 = new S3();
  }

  async upload(dataBuffer: Buffer, filename: string) {
    const result = await this.s3
      .upload({
        Bucket: this._bucket,
        Body: dataBuffer,
        Key: `${filename}-${new Date()}`,
      })
      .promise();

    return result.Location;
  }
}
