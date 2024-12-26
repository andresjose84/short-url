import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap () {
  const app = await NestFactory.create( AppModule );

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe( {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    } )
  );

  const config = new DocumentBuilder()
    .setTitle( 'Short URLs RESTful API' )
    .setDescription( 'A powerful and user-friendly API to create, manage, and track short URLs efficiently. Developed by AJSM to simplify URL management and provide valuable analytics.' )
    .setVersion( '1.0' )
    .build();

  const document = SwaggerModule.createDocument( app, config );
  SwaggerModule.setup( 'docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'Short URLs API Docs',
  } );

  await app.listen( process.env.PORT );
  const logger = new Logger( 'Main ShortUrls' );
  logger.log( `App running on port ${ process.env.PORT }` )
  // console.log( `App running on port ${ process.env.PORT }` );
}
bootstrap();
