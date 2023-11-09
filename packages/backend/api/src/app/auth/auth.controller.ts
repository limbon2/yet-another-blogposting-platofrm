import { AuthUserDto, SignInDataDto, SignUpDataDto } from '@blogposting-platform/entities';
import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from '../common/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get current authenticated user information' })
  @ApiHeader({ name: 'authorization' })
  @ApiResponse({ type: AuthUserDto })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public me(@CurrentUser() user: AuthUserDto): AuthUserDto {
    return user;
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignUpDataDto })
  @ApiOkResponse({ type: Boolean })
  @Post('sign-up')
  public signUp(@Body() data: SignUpDataDto): Promise<boolean> {
    return this.authService.register(data);
  }

  @ApiOperation({ summary: 'Sign in with username and password' })
  @ApiBody({ type: SignInDataDto })
  @ApiOkResponse({ type: AuthUserDto })
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  public signIn(@CurrentUser() user: AuthUserDto): AuthUserDto {
    return user;
  }

  @ApiOperation({ summary: 'Confirm user registration code' })
  @ApiQuery({ name: 'code', description: 'Code that user code from email message' })
  @ApiOkResponse({ type: AuthUserDto })
  @Get('confirm')
  public async confirm(@Query('code') code: string, @Res() res: Response): Promise<void> {
    const user = await this.authService.confirm(code);
    // TODO: Redirect to frontend app
    res.redirect(`http://localhost:3000/posts?accessToken=${user.accessToken}`);
  }

  @ApiOperation({ summary: 'Resend email confirmation to specified create user' })
  @ApiQuery({ name: 'email', description: 'Email to resend confirmation code' })
  @ApiOkResponse({ type: Boolean })
  @Post('resend')
  public resendEmailConfirmation(@Query('email') email: string): Promise<boolean> {
    return this.authService.sendEmailConfirmation(email);
  }
}
