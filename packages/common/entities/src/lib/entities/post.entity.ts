import { Entity, Formula, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { IPost } from '../interface/post.interface';
import { ReportEntity } from './report.entity';
import { BanEntity } from './ban.entity';
import { CommentEntity } from './comment.entity';
import { CommunityEntity } from './community.entity';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

const tableName = 'posts';

@Entity({ tableName })
export class PostEntity implements IPost {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Property()
  public title: string;

  @Property()
  public content: string;

  @Property({ type: 'bigint' })
  public rating: number = 0;

  @Property({ nullable: true })
  public isBanned: boolean = false;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @ManyToOne(() => UserEntity)
  public author?: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.posts, { eager: true, owner: true })
  public tags: TagEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  public comments: CommentEntity[];

  @ManyToOne(() => CommunityEntity, { nullable: true })
  public community?: CommunityEntity;

  @Formula((alias) => `(select * from reports r where r.target_id = ${alias}.id)`, { lazy: true })
  public reports?: ReportEntity[];

  @Formula((alias) => `(select count(*) from comments c where c.post_id = ${alias}.id)`)
  public commentCount: number;

  @Formula((alias) => `(select * from bans b where b.target_id = ${alias}.id)`, {
    lazy: true,
    nullable: true,
    type: 'jsonb',
  })
  public ban?: BanEntity;
}
