import { Controller, Get, Logger, Param, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RedirectService } from './redirect.service';
import { Response } from 'express';

@Controller()
export class RedirectController {
  private readonly logger = new Logger( RedirectController.name );

  constructor( private readonly redirectService: RedirectService ) { }

  @Get()
  @ApiOperation( { summary: 'Welcome Message' } )
  @ApiResponse( {
    status: 200,
    description: 'Welcome Message',
    content: {
      'application/json': {
        schema: {
          type: 'string',
          example: 'Developer by AJSM',
        },
      },
    },
  } )
  findAll () {
    return 'Developer by AJSM';
  }

  @Get( ':shortCode' )
  @ApiOperation( { summary: 'Redirect url' } )
  @ApiParam( {
    name: 'shortCode',
    description: 'Short Code Url',
    type: String,
  } )
  @ApiResponse( {
    status: 200,
    description: 'Success redirect',
  } )
  @ApiResponse( {
    status: 404,
    description: 'URL not found',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'URL not found' },
          },
        },
      },
    },
  } )
  async findCode (
    @Param( 'shortCode' ) shortCode: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const longUrl = await this.redirectService.findShortUrl( shortCode, req.headers );
    this.logger.log( 'Endpoint GET /short_url llamado con longUrl: ' + longUrl );

    if ( !longUrl ) {
      return res.status( 404 ).send( { message: 'URL not found' } );
    }

    return res.redirect( longUrl as string );
  }
}
