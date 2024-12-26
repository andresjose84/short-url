import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { initSeed } from './data/init';

import { User } from '../user/entities/user.entity';
import { Shorturl } from '../shorturl/entities/shorturl.entity';

import { generateUniqueShortHash } from '../common/helpers/hashUrl';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository( User )
    private readonly userRepository: Repository<User>,
    @InjectRepository( Shorturl )
    private readonly shorturlRepository: Repository<Shorturl>,
  ) { }

  async create () {

    try {
      initSeed.user.map( async user => {
        const userRepo = this.userRepository.create( user );

        const salt = bcrypt.genSaltSync( 10 );
        userRepo.user_password = bcrypt.hashSync( userRepo.user_password, salt );
        userRepo.created = new Date().getTime();
        userRepo.modified = new Date().getTime();
        userRepo.status = true;

        const { _id, user: user_nickname } = await this.userRepository.save( userRepo );

        const newShortUrl = {
          url: initSeed.urls + user_nickname,
          short_url: await generateUniqueShortHash(),
          name_url: user_nickname + ' Url',
          user_id: _id,
          created: new Date().getTime(),
          modified: new Date().getTime(),
          status: true,
        };

        const shortRepo = this.shorturlRepository.create( newShortUrl );
        await this.shorturlRepository.save( shortRepo );
        
      } );
      return `Seed executed`;
    } catch ( error ) {
      this.handlerDbErrors( error );
    }

  }

  private handlerDbErrors ( error: any ): never {
    if ( error.code === '23505' ) {
      throw new BadRequestException( error.detail );
    }

    console.log( error );

    throw new InternalServerErrorException( 'Please check server logs.' );
  }

}
