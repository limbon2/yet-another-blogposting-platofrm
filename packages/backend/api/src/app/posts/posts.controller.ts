import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePostDataDto, CreateRatingDataDto, PostDto, UserDto } from '@blogposting-platform/entities';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Get a number of posts' })
  @ApiQuery({ name: 'offset', description: 'A number representing how many posts will be skipped', required: false })
  @ApiQuery({ name: 'count', description: 'A number of posts to fetch', required: false })
  @ApiOkResponse({ type: [PostDto] })
  @Get()
  public get(
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
    @Query('count', new ParseIntPipe({ optional: true })) count?: number
  ): Promise<PostDto[]> {
    return this.postsService.get(offset, count);
  }

  @ApiOperation({ summary: 'Search posts using a single query string' })
  @ApiQuery({ name: 'q', description: 'The query string that will be applied to all posts to find the right ones' })
  @ApiOkResponse({ type: [PostDto] })
  @Get('search')
  public search(@Query('q') query: string): Promise<PostDto[]> {
    return this.postsService.search(query);
  }

  @ApiOperation({ summary: 'Create a post' })
  @ApiBody({ type: CreatePostDataDto })
  @ApiOkResponse({ type: PostDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  public create(@Req() request: Request, @Body() data: CreatePostDataDto): Promise<PostDto> {
    return this.postsService.create(request.user as UserDto, data);
  }

  @ApiOperation({ summary: 'Increase or decrease rating of a post' })
  @ApiParam({ name: 'postId', description: 'The id of a post to rate' })
  @ApiBody({ type: CreateRatingDataDto })
  @ApiOkResponse({ type: PostDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':postId/rate')
  public rate(
    @Req() request: Request,
    @Param('postId') postId: string,
    @Body() data: CreateRatingDataDto
  ): Promise<PostDto> {
    return this.postsService.rate(request.user as UserDto, postId, data);
  }
}
