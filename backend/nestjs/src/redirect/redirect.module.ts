import { Module } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectController } from './redirect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Clicks, Shorturl } from '../shorturl/entities';

@Module( {
  controllers: [ RedirectController ],
  providers: [ RedirectService ],
  imports: [ TypeOrmModule.forFeature( [ Shorturl, Clicks ] ), AuthModule ],
  exports: [ TypeOrmModule ]
} )
export class RedirectModule { }
