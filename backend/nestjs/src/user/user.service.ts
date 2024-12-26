import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  private readonly logger = new Logger( 'UserService' );

  constructor(
    @InjectRepository( User )
    private readonly userRepository: Repository<User>
  ) { }



  findAll ( userLoged: User ) {

    console.log( {
      userLoged
    } );


    const user = this.userRepository.find( {
      select: {
        _id: true,
        user: true,
        user_name: true,
        user_last_name: true,
        user_email: true,
        user_image: true,
        created: true,
        status: true
      },
      order: {
        _id: 'ASC'
      }
    } );

    return user;
  }

  async create ( createUserDto: CreateUserDto, userLoged: User ) {
    try {

      const { user_password, ...userData } = createUserDto;

      const user = this.userRepository.create( {
        ...userData,
        created: new Date().getTime(),
        modified: new Date().getTime(),
        status: true,
        user_password: bcrypt.hashSync( user_password, 10 )
      } );

      await this.userRepository.save( user );

      delete user.user_password;
      delete user.status;
      delete user.user_type;

      return {
        ...user
      };
    } catch ( error ) {
      this.handlerDbErrors( error )
    }
  }

  async findOne ( _id: number, userLoged: User ) {

    if ( _id !== userLoged._id && userLoged.user_type !== 1 ) {
      // throw new UnauthorizedException("Unauthorized access. You are not allowed to perform this action.");
      return {
        ok: false,
        message: "Unauthorized access. You are not allowed to perform this action."
      }
    }

    const user = await this.userRepository.findOneBy( { _id } );
    // console.log( 'findOne',{ user } );
    delete user.user_password;
    delete user.status;
    delete user.user_type;
    return {
      ...user
    };
  }

  async update ( id: number, updateUserDto: UpdateUserDto, userLoged: User ) {

    try {

      if ( id !== userLoged._id && userLoged.user_type !== 1 ) {
        // throw new UnauthorizedException("Unauthorized access. You are not allowed to perform this action.");
        return {
          ok: false,
          message: "Unauthorized access. You are not allowed to perform this action."
        }
      }

      const userData = updateUserDto;

      userData.modified = new Date().getTime();

      await this.userRepository.update( { _id: id }, userData );

      let user = await this.userRepository.findOneBy( { _id: id } );
      delete user.user_password;
      delete user.status;
      delete user.user_type;

      return user;

    } catch ( error ) {
      this.handlerDbExceptions( error );
    }
  }

  async remove ( id: number, userLoged: User ) {

    try {
      let user = await this.userRepository.update( { _id: id }, { status: false } );
      return user;
    } catch ( error ) {
      this.handlerDbExceptions( error );
    }

    return `This action removes a #${ id } user`;
  }

  private handlerDbExceptions ( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail )

    this.logger.error( error );
    throw new InternalServerErrorException( 'Unexpected error, check server logs' );
  }

  private handlerDbErrors ( error: any ): never {
    if ( error.code === '23505' ) {
      throw new BadRequestException( error.detail );
    }

    console.log( error );

    throw new InternalServerErrorException( 'Please check server logs.' );
  }

  private handlerErrors () {
    throw new InternalServerErrorException( 'Please check server logs.' );
  }

}
