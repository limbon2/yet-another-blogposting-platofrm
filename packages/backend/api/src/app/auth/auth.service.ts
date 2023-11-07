import { IAuthUser, ISignUpData, IUser, UserEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nContext, I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService
  ) {}

  public async register(data: ISignUpData): Promise<IAuthUser> {
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

    this.em.create(UserEntity, user);
    await this.em.flush();

    return this.login(user);
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
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        return this.login(user);
      }
    }
  }

  public login(user: IUser): IAuthUser {
    return { user, accessToken: this.jwtService.sign({ ...user }) };
  }
}
