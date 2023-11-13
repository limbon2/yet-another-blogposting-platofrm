import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CreateBanDataDto,
  CreatePostDataDto,
  CreateRatingDataDto,
  CreateReportDataDto,
  PostDto,
  PostEntity,
  ReportDto,
  UserDto,
  UserRole,
} from '@blogposting-platform/entities';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { IsPostAuthorGuard } from './guards/is-post-author.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ReportService } from '../reports/report.service';
import { RatingsService } from '../ratings/ratings.service';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { BansService } from '../bans/bans.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly ratingsService: RatingsService,
    private readonly reportService: ReportService,
    private readonly bansService: BansService
  ) {}

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

  @ApiOperation({ summary: 'Remove a certain post by its id' })
  @ApiParam({ name: 'postId', description: 'Id of a post to remove' })
  @ApiOkResponse({ type: PostDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), IsPostAuthorGuard)
  @Delete(':postId')
  public remove(@Param('postId') postId: string): Promise<PostDto> {
    return this.postsService.remove(postId);
  }

  @ApiOperation({ summary: 'Create a post' })
  @ApiBody({ type: CreatePostDataDto })
  @ApiOkResponse({ type: PostDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  public create(@CurrentUser() user: UserDto, @Body() data: CreatePostDataDto): Promise<PostDto> {
    return this.postsService.create(user, data);
  }

  @ApiOperation({ summary: 'Increase or decrease rating of a post' })
  @ApiParam({ name: 'postId', description: 'The id of a post to rate' })
  @ApiBody({ type: CreateRatingDataDto })
  @ApiOkResponse({ type: PostDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':postId/rate')
  public rate(
    @CurrentUser() user: UserDto,
    @Param('postId') postId: string,
    @Body() data: CreateRatingDataDto
  ): Promise<PostDto> {
    return this.ratingsService.createOrUpdateRating(PostEntity, user.id, postId, data);
  }

  @ApiOperation({ summary: 'Report a certain post for violation platform rules' })
  @ApiParam({ name: 'postId', description: 'The id of a post to report' })
  @ApiBody({ type: CreateReportDataDto })
  @ApiOkResponse({ type: ReportDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post(':postId/report')
  public report(
    @CurrentUser() user: UserDto,
    @Param('postId') postId: string,
    @Body() data: CreateReportDataDto
  ): Promise<ReportDto> {
    return this.reportService.create(PostEntity, user, postId, data);
  }

  @ApiOperation({ summary: 'Ban post and restrict user access to it' })
  @ApiParam({ name: 'postId', description: 'The id of a post to ban' })
  @ApiBody({ type: CreateBanDataDto })
  @ApiOkResponse({ type: PostDto })
  @ApiBearerAuth()
  @Roles(UserRole.Admin, UserRole.Moderator)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post(':postId/ban')
  public ban(
    @CurrentUser() user: UserDto,
    @Param('postId') postId: string,
    @Body() data: CreateBanDataDto
  ): Promise<PostDto> {
    return this.bansService.ban(PostEntity, user, postId, data);
  }

  @ApiOperation({ summary: 'Return public access to a post and unban it' })
  @ApiParam({ name: 'postId', description: 'The id of a post to unban' })
  @ApiOkResponse({ type: PostDto })
  @ApiBearerAuth()
  @Roles(UserRole.Admin, UserRole.Moderator)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post(':postId/unban')
  public unban(@Param('postId') postId: string): Promise<PostDto> {
    return this.bansService.unban(PostEntity, postId);
  }
}
