<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Short URL API

RESTful API developed with NestJS for URL shortening service.

## Description

This project provides a URL shortening service with user authentication and management features.

## Core Technologies

- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI

## Prerequisites

- Node.js (v18 or higher)
- Docker Desktop (recommended)
- PostgreSQL
- npm or yarn
- Environment variables configured (see .env.template)

### Database

- Option 1: Docker Desktop installed to run PostgreSQL in container
- Option 2: PostgreSQL locally installed

## Getting Started

1. Clone repository

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies

    ```bash
    yarn
    ```

3. Environment configuration
    - Copy `.env.template` to `.env`
    - Fill in the environment variables in `.env` file

4. Database deployment

    ```bash
    docker-compose up -d
    ```

5. Start development server

    ```bash
    # Development
    $ yarn start:dev

    # Production
    $ yarn start:prod
    ```

6. Initialize database (optional)

    ```bash
    # Access this endpoint to populate the database with initial data
    http://localhost:3000/api/v1.0/seed/
    ```

## API Documentation

API documentation is available at:

```
http://localhost:3000/docs
```

## Testing

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Features

- URL Shortening
- User Authentication
- URL Management per User
- Swagger Documentation
- Data Validation
- Role-based Access Control

## Project Structure

```
src/
├── auth/           # Authentication and authorization
├── config/         # Configurations
├── users/          # User management
├── urls/           # URL shortening logic
└── common/         # Shared utilities
```

## Author

- [@andresjose84](https://github.com/andresjose84)

## License

[MIT](LICENSE)
