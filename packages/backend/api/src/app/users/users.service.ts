import { FollowerEntity, IFollower, IUser, UserEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  public countFollowers(user: IUser): Promise<number> {
    return this.em.count(FollowerEntity, { user: { id: user.id } });
  }

  public async follow(followerUser: IUser, leadId: string): Promise<IFollower> {
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
}
