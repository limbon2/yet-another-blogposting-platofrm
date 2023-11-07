import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from '@blogposting-platform/entities';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Get a number of posts' })
  @ApiQuery({ name: 'offset', description: 'A number representing how many posts will be skipped', required: false })
  @ApiQuery({ name: 'count', description: 'A number of posts to fetch', required: false })
  @ApiResponse({ type: [PostDto] })
  @Get()
  public get(
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
    @Query('count', new ParseIntPipe({ optional: true })) count?: number
  ): Promise<PostDto[]> {
    return this.postsService.get(offset, count);
  }
}
