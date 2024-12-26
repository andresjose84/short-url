import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { UserModule } from '../user/user.module';
import { ShorturlModule } from '../shorturl/shorturl.module';

@Module( {
  controllers: [ SeedController ],
  providers: [ SeedService ],
  imports: [
    UserModule,
    ShorturlModule
  ],
} )
export class SeedModule { }
