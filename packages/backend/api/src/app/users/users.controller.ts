import { FollowerDto, UserDto } from '@blogposting-platform/entities';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get count of all followers for current user' })
  @ApiOkResponse({ type: Number })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('followers')
  public followers(@CurrentUser() user: UserDto): Promise<number> {
    return this.usersService.countFollowers(user);
  }

  @ApiOperation({ summary: 'Subscribe to user new posts' })
  @ApiParam({ name: 'userId', description: 'The id of user to follow' })
  @ApiOkResponse({ type: FollowerDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post(':userId/follow')
  public follow(@CurrentUser() user: UserDto, @Param('userId') leadId: string): Promise<FollowerDto> {
    return this.usersService.follow(user, leadId);
  }
}
