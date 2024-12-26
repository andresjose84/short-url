import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetRawHeaders = createParamDecorator( ( data: string, ctx: ExecutionContext ) => {

    const req = ctx.switchToHttp().getRequest();

    //console.log( { headers: req.headers, rawheaders: req.rawHeaders } );

    if ( !data ) {
        return req.rawHeaders;
    }

    return req.headers[ data ];
} ) 