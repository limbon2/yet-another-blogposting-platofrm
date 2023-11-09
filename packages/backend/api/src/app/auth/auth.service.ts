import { IAuthUser, ISignUpData, IUser, UserEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { random } from 'lodash';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../emails/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
    private readonly email: EmailService
  ) {}

  private generateCode(): string {
    const tokens = '0123456789';
    const n = 6;

    let result = '';

    for (let i = 0; i < n; i++) {
      const randomIndex = random(0, tokens.length - 1);
      const token = tokens[randomIndex];
      result = result.concat(token);
    }

    return result;
  }

  public async register(data: ISignUpData): Promise<boolean> {
    const { emails, usernames } = await this.findDuplicateCount(data.email, data.username);

    if (emails > 0)
      throw new ConflictException(this.i18n?.t('errors.email', { lang: I18nContext.current()?.lang }), {
        cause: 'AuthService',
      });
    if (usernames > 0)
      throw new ConflictException(this.i18n?.t('errors.username', { lang: I18nContext.current()?.lang }), {
        cause: 'AuthService',
      });

    const user = new UserEntity();
    user.email = data.email;
    user.password = bcrypt.hashSync(data.password, 12);
    user.username = data.username;
    user.code = this.generateCode();

    this.em.create(UserEntity, user);
    await this.em.flush();

    await this.email.sendTo([user.email], 'Email confirmation', 'email-confirmation', {
      code: user.code,
      username: user.username,
      link: `http://localhost:3000/api/auth/confirm?code=${user.code}`, // TODO: Add actual confirmation link
    });

    return true;
  }

  private async findDuplicateCount(email: string, username: string): Promise<{ usernames: number; emails: number }> {
    const qb = this.em.createQueryBuilder(UserEntity);

    return qb
      .raw(
        `
        SELECT
            COUNT(DISTINCT CASE WHEN "email" = :email THEN email END) AS emails,
            COUNT(DISTINCT CASE WHEN "username" = :username THEN username END) AS usernames 
        FROM users`,
        { email, username }
      )
      .then((result) => ({ emails: Number(result.rows[0].emails), usernames: Number(result.rows[0].usernames) }));
  }

  public async verify(email: string, password: string): Promise<IAuthUser | undefined> {
    const user = await this.em.findOne(UserEntity, { email });
    if (user) {
      const isValid = bcrypt.compareSync(password, user.password) && !user.code;
      if (isValid) {
        return this.login(user);
      }
    }
  }

  public login(user: IUser): IAuthUser {
    return { user, accessToken: this.jwtService.sign({ ...user }) };
  }

  public async confirm(code: string): Promise<IAuthUser> {
    const user = await this.em.findOne(UserEntity, { code });

    if (!user) throw new BadRequestException();

    user.code = undefined;

    await this.em.upsert(UserEntity, user);
    await this.em.flush();

    return this.login(user);
  }
}
