import { FollowerEntity, IFollower, IUser, UserEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager, private readonly storageService: StorageService) {}

  public countFollowers(user: IUser): Promise<number> {
    return this.em.count(FollowerEntity, { user: { id: user.id } });
  }

  public async follow(followerUser: IUser, leadId: number): Promise<IFollower> {
    const [user, lead, existingFollower] = await Promise.all([
      this.em.findOne(UserEntity, { id: followerUser.id }),
      this.em.findOne(UserEntity, { id: leadId }),
      this.em.findOne(
        FollowerEntity,
        { user: { id: followerUser.id }, lead: { id: leadId } },
        { populate: ['user', 'lead'] }
      ),
    ]);

    if (!user || !lead) throw new BadRequestException();

    if (existingFollower) {
      this.em.remove(existingFollower);
      await this.em.flush();
      return existingFollower;
    }

    const follower = new FollowerEntity();
    follower.user = user;
    follower.lead = lead;

    this.em.create(FollowerEntity, follower);
    await this.em.flush();

    return follower;
  }

  public async uploadAvatar(user: IUser, file: Express.Multer.File): Promise<IUser> {
    const dbUser = await this.em.findOne(UserEntity, { id: user.id });
    if (!dbUser) throw new BadRequestException();

    const path = `users/${dbUser.id}/avatar.png`;

    const uploadSuccess = await this.storageService.uploadImage(path, file, { width: 48, height: 48 });
    if (!uploadSuccess) throw new InternalServerErrorException();

    dbUser.avatarUrl = path;
    await this.em.upsert(UserEntity, dbUser);
    await this.em.flush();

    return dbUser;
  }
}
