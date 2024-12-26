import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Short URL API',
        version: '1.0.0',
        description: 'API for creating and redirecting short URLs',
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
            },
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = [ './src/routes/index.ts' ];

swaggerAutogen( { openapi: '3.0.0' } )( outputFile, endpointsFiles, doc );
