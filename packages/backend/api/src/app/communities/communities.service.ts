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
import slugify from 'slugify';

@Injectable()
export class CommunitiesService {
  constructor(private readonly em: EntityManager) {}

  public async create(user: IUser, data: ICreateCommunityData): Promise<ICommunity> {
    const slug = slugify(data.name, { lower: true });

    const [creator, existingCommunity] = await Promise.all([
      this.em.findOne(UserEntity, { id: user.id }),
      this.em.findOne(CommunityEntity, { slug }),
    ]);

    if (!creator || existingCommunity) throw new BadRequestException();

    const community = new CommunityEntity();
    community.name = data.name;
    community.slug = slug;
    community.creator = creator;

    this.em.create(CommunityEntity, community);
    await this.em.flush();

    return community;
  }

  public async get(offset?: number, count?: number): Promise<ICommunity[]> {
    return this.em.find(CommunityEntity, {}, { offset, limit: count });
  }

  public async getPosts(slug: string): Promise<IPost[]> {
    const community = await this.em.findOne(CommunityEntity, { slug });

    if (!community) throw new BadRequestException();

    return this.em.find(PostEntity, { community: { id: community.id } });
  }
}
