import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "../../user/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ) {

        super( {
            secretOrKey: configService.get( 'JWT_SECRET' ),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        } );
    }

    async validate ( payload: JwtPayload ): Promise<User> {

        const { uid } = payload;

        const user = await this.userRepository.findOneBy( { _id: +uid } );

        if ( !user ) throw new UnauthorizedException( 'Token not valid' );

        if ( !user.status ) throw new UnauthorizedException( 'User is inactive, talk with an admin.' )

        return user;
    }

}