import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ShorturlService } from './shorturl.service';
import { CreateShorturlDto } from './dto/create-shorturl.dto';
import { UpdateShorturlDto } from './dto/update-shorturl.dto';

import { Auth, GetUser } from '../auth/decorators';

import { User } from '../user/entities/user.entity';


@ApiTags( 'Short URLs' )
@Controller( 'api/v1.0/shorturl' )
export class ShorturlController {
  constructor( private readonly shorturlService: ShorturlService ) { }

  @Post()
  @Auth()
  @ApiOperation( { summary: 'Create a new short URL' } )
  @ApiResponse( { status: 201, description: 'The short URL has been created.' } )
  @ApiResponse( { status: 400, description: 'Invalid request data.' } )
  @ApiResponse( { status: 401, description: 'Unauthorized request.' } )
  create (
    @Body() createShorturlDto: CreateShorturlDto,
    @GetUser() user: User,
  ) {
    return this.shorturlService.create( createShorturlDto, user );
  }

  @Get()
  @Auth()
  @ApiOperation( { summary: 'Retrieve all short URLs for the authenticated user' } )
  @ApiResponse( { status: 200, description: 'List of short URLs.' } )
  @ApiResponse( { status: 401, description: 'Unauthorized request.' } )
  findAll (
    @GetUser() user: User,
  ) {
    return this.shorturlService.findAll( user );
  }

  @Get( ':id' )
  @Auth()
  @ApiOperation( { summary: 'Retrieve a specific short URL by ID' } )
  @ApiResponse( { status: 200, description: 'Short URL details.' } )
  @ApiResponse( { status: 404, description: 'Short URL not found.' } )
  @ApiResponse( { status: 401, description: 'Unauthorized request.' } )
  findOne (
    @Param( 'id' ) id: string,
    @GetUser() user: User,
  ) {
    return this.shorturlService.findOne( +id, user );
  }

  @Patch( ':id' )
  @Auth()
  @ApiOperation( { summary: 'Update a specific short URL by ID' } )
  @ApiResponse( { status: 200, description: 'The short URL has been updated.' } )
  @ApiResponse( { status: 400, description: 'Invalid request data.' } )
  @ApiResponse( { status: 404, description: 'Short URL not found.' } )
  @ApiResponse( { status: 401, description: 'Unauthorized request.' } )
  update (
    @Param( 'id' ) id: string,
    @Body() updateShorturlDto: UpdateShorturlDto,
    @GetUser() user: User,
  ) {
    return this.shorturlService.update( +id, updateShorturlDto, user );
  }

  @Delete( ':id' )
  @Auth()
  @ApiOperation( { summary: 'Delete a specific short URL by ID' } )
  @ApiResponse( { status: 200, description: 'The short URL has been deleted.' } )
  @ApiResponse( { status: 404, description: 'Short URL not found.' } )
  @ApiResponse( { status: 401, description: 'Unauthorized request.' } )
  remove (
    @Param( 'id' ) id: string,
    @GetUser() user: User,
  ) {
    return this.shorturlService.remove( +id, user );
  }
}
