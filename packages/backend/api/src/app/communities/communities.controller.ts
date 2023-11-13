import { CommunityDto, CreateCommunityDataDto, PostDto, UserDto } from '@blogposting-platform/entities';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommunitiesService } from './communities.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Communities')
@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @ApiOperation({ summary: 'Create a community' })
  @ApiBody({ type: CreateCommunityDataDto })
  @ApiOkResponse({ type: CommunityDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  public create(@CurrentUser() user: UserDto, @Body() data: CreateCommunityDataDto): Promise<CommunityDto> {
    return this.communitiesService.create(user, data);
  }

  @ApiOperation({ summary: 'Get a number of communities' })
  @ApiQuery({
    name: 'offset',
    description: 'A number representing how many communities will be skipped',
    required: false,
  })
  @ApiQuery({ name: 'count', description: 'A number of communities to fetch', required: false })
  @ApiOkResponse({ type: [CommunityDto] })
  @Get()
  public get(
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
    @Query('count', new ParseIntPipe({ optional: true })) count?: number
  ): Promise<CommunityDto[]> {
    return this.communitiesService.get(offset, count);
  }

  @ApiOperation({ summary: 'Get posts by community slug' })
  @ApiParam({ name: 'slug', description: 'A lowered kebab case name of a community' })
  @ApiOkResponse({ type: [PostDto] })
  @Get(':slug')
  public getPosts(@Param('slug') slug: string): Promise<PostDto[]> {
    return this.communitiesService.getPosts(slug);
  }
}
