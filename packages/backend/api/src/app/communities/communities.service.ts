import {
  CommunityEntity,
  ICommunity,
  ICreateCommunityData,
  IPost,
  IUser,
  PostEntity,
  UserEntity,
} from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { kebabCase } from 'lodash';

@Injectable()
export class CommunitiesService {
  constructor(private readonly em: EntityManager) {}

  public async create(user: IUser, data: ICreateCommunityData): Promise<ICommunity> {
    const nameLowerCase = kebabCase(data.name);

    const [creator, existingCommunity] = await Promise.all([
      this.em.findOne(UserEntity, { id: user.id }),
      this.em.findOne(CommunityEntity, { nameLowerCase }),
    ]);

    if (!creator || existingCommunity) throw new BadRequestException();

    const community = new CommunityEntity();
    community.name = data.name;
    community.nameLowerCase = nameLowerCase;
    community.creator = creator;

    this.em.create(CommunityEntity, community);
    await this.em.flush();

    return community;
  }

  public async get(offset?: number, count?: number): Promise<ICommunity[]> {
    return this.em.find(CommunityEntity, {}, { offset, limit: count });
  }

  public async getPosts(name: string): Promise<IPost[]> {
    const community = await this.em.findOne(CommunityEntity, { nameLowerCase: name });

    if (!community) throw new BadRequestException();

    return this.em.find(PostEntity, { community: { id: community.id } });
  }
}
