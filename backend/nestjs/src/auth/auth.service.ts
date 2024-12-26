import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../user/entities/user.entity';

import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository( User )
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create ( createUserDto: CreateUserDto ) {
    try {

      const { user_password, ...userData } = createUserDto;

      const user = this.userRepository.create( {
        ...userData,
        user_password: bcrypt.hashSync( user_password, 10 )
      } );

      await this.userRepository.save( user );

      delete user.user_password;
      delete user.status;
      delete user.user_type;

      return {
        ...user,
        token: this.getJwtToken( {
          uid: user._id,
          name: user.user,
          email: user.user_email,
          type: user.user_type
        } )
      };
    } catch ( error ) {
      this.handlerDbErrors( error )
    }
  }

  async login ( loginUserDto: LoginUserDto ) {

    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne( {
      where: { user_email: email },
      select: { _id: true, user_email: true, user_password: true }
    } );

    if ( !user ) throw new UnauthorizedException( 'Credentials are not valid.' );

    if ( !bcrypt.compareSync( password, user.user_password ) ) throw new UnauthorizedException( 'Credentials are not valid.' );

    delete user.user_password;

    return {
      ...user,
      token: this.getJwtToken( {
        uid: user._id,
        name: user.user,
        email: user.user_email,
        type: user.user_type
      } )
    };

  }

  async checkAuthStatus ( user: User, headers ) {

    const authHeader = headers[ 'authorization' ];
    if ( !authHeader ) {
      throw new UnauthorizedException( 'Authorization header is missing' );
    }

    const token = authHeader.split( ' ' )[ 1 ];
    if ( !token ) {
      throw new UnauthorizedException( 'Token is missing' );
    }

    const isValid = await this.jwtService.verify( token );

    // console.log( {
    //   isValid
    // } );

    if ( !isValid ) {
      throw new UnauthorizedException( 'Invalid token' );
    }

    return true;
  }

  private getJwtToken ( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;
  }

  private handlerDbErrors ( error: any ): never {
    if ( error.code === '23505' ) {
      throw new BadRequestException( error.detail );
    }

    // console.log( error );

    throw new InternalServerErrorException( 'Please check server logs.' );
  }
}
