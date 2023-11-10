import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Duplex } from 'stream';
import sharp from 'sharp';
import 'multer';

@Injectable()
export class StorageService {
  private bucket: Bucket;

  constructor(private readonly configService: ConfigService) {
    this.bucket = new Storage({ credentials: this.configService.getOrThrow('storage') }).bucket(
      this.configService.getOrThrow('bucket.default')
    );
  }

  private createFileStream(file: Express.Multer.File): Duplex {
    const duplex = new Duplex();
    duplex.push(file.buffer);
    duplex.push(null);
    return duplex;
  }

  public uploadImage(
    path: string,
    image: Express.Multer.File,
    options: { width: number; height: number }
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const file = this.bucket.file(path);
      this.createFileStream(image)
        .pipe(sharp().resize(options.width, options.height).png())
        .pipe(file.createWriteStream({ gzip: true }))
        .on('finish', () => resolve(true))
        .on('error', reject);
    });
  }
}
