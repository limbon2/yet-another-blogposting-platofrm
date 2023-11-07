import { IAuthUser } from '@blogposting-platform/entities';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<IAuthUser> {
    const user = await this.authService.verify(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
