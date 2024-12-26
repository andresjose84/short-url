import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

import { User } from '../user/entities/user.entity';

import { Auth, GetUser } from './decorators';

@ApiTags( 'Authentication' )
@Controller( 'api/v1.0/auth' )
export class AuthController {
  constructor( private readonly authService: AuthService ) { }

  @Post( 'login' )
  @ApiOperation( { summary: 'Login a user and generate a token' } )
  @ApiResponse( {
    status: 200,
    description: 'User successfully logged in.',
    type: String, // assuming the login returns a token or string message
  } )
  @ApiResponse( {
    status: 400,
    description: 'Invalid credentials.',
  } )
  loginUser ( @Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Get( 'check-status' )
  @Auth()
  @ApiOperation( { summary: 'Check the authentication status of the user' } )
  @ApiResponse( {
    status: 200,
    description: 'User is authenticated.',
    type: User, // You can specify the return type as User if the user object is returned
  } )
  @ApiResponse( {
    status: 401,
    description: 'User is not authenticated.',
  } )
  checkAuthStatus (
    @GetUser() user: User,
    @Headers() headers: Headers
  ) {
    return this.authService.checkAuthStatus( user, headers );
  }
}
