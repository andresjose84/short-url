import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShorturlService } from './shorturl.service';
import { ShorturlController } from './shorturl.controller';
import { Clicks, Shorturl } from './entities';

import { AuthModule } from '../auth/auth.module';

@Module( {
  controllers: [ ShorturlController ],
  providers: [ ShorturlService ],
  imports: [ TypeOrmModule.forFeature( [ Shorturl, Clicks ] ), AuthModule ],
  exports: [ TypeOrmModule ]
} )
export class ShorturlModule { }
