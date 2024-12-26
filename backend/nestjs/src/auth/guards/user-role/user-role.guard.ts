import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { META_ROLES } from '../../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate (
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // console.log( 'UserRoleGuard' );

    const validRoles: string[] = this.reflector.get( META_ROLES, context.getHandler() );

    // console.log( {
    //   validRoles
    // } );

    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if ( !user ) throw new BadRequestException( 'User not found' );

    if ( validRoles.includes( user.user_type ) ) {
      return true;
    }

    throw new ForbiddenException( `User ${ user.user } needs a valid role` )
  }
}
