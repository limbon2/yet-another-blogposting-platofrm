import { CommentDto, CreateCommentDataDto, CreateRatingDataDto, UserDto } from '@blogposting-platform/entities';
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/current-user.decorator';

@ApiTags('Posts', 'Comments')
@Controller('posts/:postId/comments')
export class PostCommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Find comments of a post' })
  @ApiParam({ name: 'postId', description: 'The id of the post to query comments from' })
  @ApiQuery({ name: 'offset', description: 'A number representing how many posts will be skipped', required: false })
  @ApiQuery({ name: 'count', description: 'A number of posts to fetch', required: false })
  @ApiOkResponse({ type: [CommentDto] })
  @Get()
  public find(@Param('postId') postId: string): Promise<CommentDto[]> {
    return this.commentsService.findByPost(postId);
  }

  @ApiOperation({ summary: 'Create comment under a certain post' })
  @ApiParam({ name: 'postId', description: 'Post id to create comment for' })
  @ApiBody({ type: CreateCommentDataDto })
  @ApiOkResponse({ type: CommentDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  public create(
    @Req() request: Request,
    @Param('postId') postId: string,
    @Body() data: CreateCommentDataDto
  ): Promise<CommentDto> {
    return this.commentsService.create(request.user as UserDto, postId, data);
  }
}

// TODO: Refactor it
/** @deprecated */
@ApiTags('Users', 'Comments')
@Controller('users/:userId/comments')
export class AuthorCommentsController {
  constructor(private commentsService: CommentsService) {}

  // TODO: Seems redundant and doesn't belong here. Consider moving to a separate RattingController
  @ApiOperation({ summary: 'Rate a users comment' })
  @ApiBody({ type: CreateRatingDataDto })
  @ApiParam({ name: 'userId', description: 'Id of a user that left the comment', deprecated: true })
  @ApiParam({ name: 'commentId', description: 'Id of a comment to rate' })
  @ApiOkResponse({ type: CommentDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':commentId/rate')
  public rate(
    @CurrentUser() user: UserDto,
    @Param('commentId') commentId: string,
    @Body() data: CreateRatingDataDto
  ): Promise<CommentDto> {
    return this.commentsService.rate(user, commentId, data);
  }
}
