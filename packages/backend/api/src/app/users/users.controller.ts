import { FollowerDto, UserDto } from '@blogposting-platform/entities';
import { Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import 'multer';

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

  @ApiOperation({ summary: 'Upload avatar image for user' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: { type: 'object', properties: { avatar: { type: 'string', format: 'binary' } } },
  })
  @ApiOkResponse({ type: UserDto })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(AuthGuard('jwt'))
  @Put('avatar')
  public avatar(@CurrentUser() user: UserDto, @UploadedFile() avatar: Express.Multer.File): Promise<UserDto> {
    return this.usersService.uploadAvatar(user, avatar);
  }
}
