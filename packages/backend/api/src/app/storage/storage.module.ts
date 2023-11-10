import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { backendConfig } from '@blogposting-platform/config';
import { StorageService } from './storage.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [backendConfig] })],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
