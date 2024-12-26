import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';

import { EnvConfiguration } from './config/app.config';

import { RedirectModule } from './redirect/redirect.module';
import { UserModule } from './user/user.module';
import { ShorturlModule } from './shorturl/shorturl.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';

@Module( {
  imports: [
    ConfigModule.forRoot( {
      load: [ EnvConfiguration ],
    } ),

    TypeOrmModule.forRoot( {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === "prod",
      extra: {
        ssl:
          process.env.DB_SSL === "prod"
            ? {
              rejectUnauthorized: false,
            }
            : null,
      },
    } ),

    RedirectModule,
    SeedModule,
    AuthModule,
    ShorturlModule,
    UserModule,
    CommonModule,
  ],
  controllers: [],
  providers: [ AppService ],
} )
export class AppModule { }
