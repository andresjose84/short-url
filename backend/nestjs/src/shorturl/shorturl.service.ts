import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateShorturlDto } from './dto/create-shorturl.dto';
import { UpdateShorturlDto } from './dto/update-shorturl.dto';

import { User } from '../user/entities/user.entity';
import { Shorturl } from './entities';

import { generateUniqueShortHash } from '../common/helpers/hashUrl';

@Injectable()
export class ShorturlService {

  private readonly logger = new Logger( 'UserService' );

  constructor(
    @InjectRepository( Shorturl )
    private readonly shorturlRepository: Repository<Shorturl>
  ) { }

  async create ( createShorturlDto: CreateShorturlDto, user: User ) {
    try {
      const shortUrl = this.shorturlRepository.create( {
        url: createShorturlDto.url,
        short_url: await generateUniqueShortHash(),
        name_url: createShorturlDto.name_url,
        user_id: user._id,
        created: new Date().getTime(),
        modified: new Date().getTime(),
        status: true
      } );

      await this.shorturlRepository.save( shortUrl );

      return true;
    } catch ( error ) {
      this.handlerDbErrors( error );
    }
  }

  async findAll ( user: User ) {

    try {

      // const queryBuilder = this.shorturlRepository
      //   .createQueryBuilder( 'shorturl' );

      // const shortUrls = await queryBuilder
      //   .select( [
      //     'shorturl.id',
      //     'shorturl.name_url',
      //     'shorturl.url',
      //     'shorturl.short_url',
      //     'shorturl.status'
      //   ] )
      //   .where( 'shorturl.user_id = :userId', { userId: user._id } )
      //   .andWhere( 'shorturl.status = :status', { status: true } )
      //   .leftJoinAndSelect( 'shorturl.clicks', 'Clicks' )
      //   .orderBy( 'shorturl.created', 'DESC' )
      //   .getMany();

      const shortUrls = await this.shorturlRepository
        .createQueryBuilder( 'shorturl' )
        .select( [
          'shorturl.id',
          'shorturl.url',
          'shorturl.short_url',
          'shorturl.name_url',
          'shorturl.status',
          'shorturl.created',
          'shorturl.modified',
        ] )
        .addSelect( 'COUNT(clicks.id)', 'clickCount' )
        .leftJoin( 'shorturl.clicks', 'clicks' )
        .where( 'shorturl.user_id = :userId', { userId: user._id } )
        .groupBy( 'shorturl.id' )
        .orderBy( 'shorturl.created', 'DESC' )
        .getRawMany();

      // console.log( queryBuilder.getSql() );

      return shortUrls.map( shorturl => ( {
        id: shorturl.shorturl_id,
        url: shorturl.shorturl_url,
        short_url: shorturl.shorturl_short_url,
        name_url: shorturl.shorturl_name_url,
        status: shorturl.shorturl_status,
        created: shorturl.shorturl_created,
        modified: shorturl.shorturl_modified,
        clickCount: parseInt( shorturl.clickCount, 10 ),
      } ) );
    } catch ( error ) {
      this.handlerDbErrors( error );
    }

  }

  async findOne ( id: number, user: User ) {
    try {
      // const queryBuilder = this.shorturlRepository
      //   .createQueryBuilder( 'shorturl' );

      // const shortUrls = await queryBuilder
      //   .select( [
      //     'shorturl.id',
      //     'shorturl.name_url',
      //     'shorturl.url',
      //     'shorturl.short_url',
      //     'shorturl.status'
      //   ] )
      //   .where( 'shorturl.user_id = :userId', { userId: user._id } )
      //   .andWhere( 'shorturl.id = :id', { id } )
      //   .leftJoinAndSelect( 'shorturl.clicks', 'Clicks' )
      //   .orderBy( 'shorturl.created', 'DESC' )
      //   .getMany();

      // // console.log( queryBuilder.getSql() );

      // return shortUrls[ 0 ];

      const shorturl = await this.shorturlRepository
        .createQueryBuilder( 'shorturl' )
        .select( [
          'shorturl.id',
          'shorturl.url',
          'shorturl.short_url',
          'shorturl.name_url',
          'shorturl.status',
          'shorturl.created',
          'shorturl.modified',
        ] )
        .addSelect( 'COUNT(clicks.id)', 'clickCount' )
        .leftJoin( 'shorturl.clicks', 'clicks' )
        .where( 'shorturl.id = :id', { id } )
        .andWhere( 'shorturl.user_id = :userId', { userId: user._id } )
        .groupBy( 'shorturl.id' )
        .getRawOne();

      if ( !shorturl ) {
        throw new Error( 'ShortURL not found or does not belong to the user' );
      }

      return {
        id: shorturl.shorturl_id,
        url: shorturl.shorturl_url,
        short_url: shorturl.shorturl_short_url,
        name_url: shorturl.shorturl_name_url,
        status: shorturl.shorturl_status,
        created: shorturl.shorturl_created,
        modified: shorturl.shorturl_modified,
        clickCount: parseInt( shorturl.clickCount, 10 ),
      };

    } catch ( error ) {
      this.handlerDbErrors( error );
    }
  }

  async update ( id: number, updateShorturlDto: UpdateShorturlDto, user: User ) {
    try {
      const shortUrlData = updateShorturlDto;

      shortUrlData.modified = new Date().getTime();

      await this.shorturlRepository.update( { id }, shortUrlData );

      return true;
    } catch ( error ) {
      this.handlerDbErrors( error );
    }
  }

  async remove ( id: number, user: User ) {

    try {
      await this.shorturlRepository.update( { id, user_id: user._id }, { status: false } );
      return true;
    } catch ( error ) {
      this.handlerDbExceptions( error );
    }

    return `This action removes a #${ id } shorturl`;
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

}
