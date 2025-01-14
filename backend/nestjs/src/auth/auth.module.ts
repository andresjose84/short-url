import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from '../user/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
9
@Module( {
  controllers: [ AuthController ],
  providers: [ AuthService, JwtStrategy ],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature( [ User ] ),

    PassportModule.register( { defaultStrategy: 'jwt' } ),

    JwtModule.registerAsync( {
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ( {
        secret: configService.get( 'JWT_SECRET' ),
        signOptions: {
          expiresIn: '2h'
        },
      } )
    } ),
  ],
  exports: [ TypeOrmModule, JwtStrategy, PassportModule, JwtModule ],
} )
export class AuthModule { }
