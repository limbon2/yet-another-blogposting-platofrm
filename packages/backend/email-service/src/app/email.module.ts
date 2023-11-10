import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { backendConfig } from '@blogposting-platform/config';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [backendConfig] })],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
