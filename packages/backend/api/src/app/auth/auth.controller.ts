import { AuthUserDto, SignInDataDto, SignUpDataDto } from '@blogposting-platform/entities';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get current authenticated user information' })
  @ApiHeader({ name: 'authorization' })
  @ApiResponse({ type: AuthUserDto })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public me(@Req() request: Request): AuthUserDto {
    return request.user as AuthUserDto;
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignUpDataDto })
  @ApiOkResponse({ type: AuthUserDto })
  @Post('sign-up')
  public signUp(@Body() data: SignUpDataDto): Promise<AuthUserDto> {
    return this.authService.register(data);
  }

  @ApiOperation({ summary: 'Sign in with username and password' })
  @ApiBody({ type: SignInDataDto })
  @ApiOkResponse({ type: AuthUserDto })
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  public signIn(@Req() request: Request): AuthUserDto {
    return request.user as AuthUserDto;
  }
}
