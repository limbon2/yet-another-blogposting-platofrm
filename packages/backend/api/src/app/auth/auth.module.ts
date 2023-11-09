import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService, backendConfig } from '@blogposting-platform/config';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailModule } from '../emails/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [backendConfig] }),
    JwtModule.registerAsync({ useClass: JwtConfigService, imports: [ConfigModule.forRoot({ load: [backendConfig] })] }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
