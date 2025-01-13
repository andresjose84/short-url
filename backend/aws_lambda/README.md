# Short URL Backend - AWS Lambda

This project is a backend service for a URL shortening application, built using AWS Lambda and AWS SAM (Serverless Application Model).

## Prerequisites

- AWS CLI installed and configured
- AWS SAM CLI installed
- Docker installed
- Node.js installed

## Project Structure

- `src/` - Contains the Lambda function code
- `template.yaml` - AWS SAM template defining the serverless application

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/andresjose84/short-url.git
    cd backend/aws_lambda
    ```

2. Edit `template.yaml` and set environment variables for MongoDB connection:

    - `DB_CNN`: MongoDB connection string.
    - `SECRET_JWT_SEED`: Secret for JWT signing.
    - `EXPIRE_JWT`: JWT expiration time.

## Running Locally

1. Start the SAM local environment:

    ```bash
    sam local start-api
    ```

2. Run locally using NPM:

    ```bash
    npm run dev
    ```

3. Use Docker with MongoDB and NPM:

    ```bash
    docker-compose up -d
    npm run dev:samlocal
    ```

4. Test seed data with:

    ```bash
    curl http://localhost:3000/api/v1.0/seed
    ```

5. The API will be available at `http://localhost:3000`.

## Features and Endpoints

The application provides the following endpoints:

### Users

- `GET /api/v1.0/users` - Retrieve all users.
- `GET /api/v1.0/users/{id}` - Retrieve a specific user by ID.
- `POST /api/v1.0/users` - Create a new user.
- `PUT /api/v1.0/users/{id}` - Update a user by ID.
- `DELETE /api/v1.0/users/{id}` - Delete a user by ID.

### Authentication

- `POST /api/v1.0/auth/login` - Log in a user.
- `GET /api/v1.0/auth/check-status` - Validate user token.

### Short URLs

- `GET /api/v1.0/shorturl` - Retrieve all short URLs.
- `GET /api/v1.0/shorturl/{id}` - Retrieve a specific short URL by ID.
- `POST /api/v1.0/shorturl` - Create a new short URL.
- `PUT /api/v1.0/shorturl/{id}` - Update a short URL by ID.
- `DELETE /api/v1.0/shorturl/{id}` - Delete a short URL by ID.

### Redirection

- `GET /{shorturi}` - Redirect to the original URL based on the short URI.

### Seed Data

- `GET /api/v1.0/seed` - Populate the database with test data.

## Middleware Layer

The project includes an AWS Lambda layer for authentication and authorization middleware. This layer is used to handle common authentication tasks across multiple functions.

### Layer Details

- **Layer Name**: `auth-middleware-layer`
- **Description**: Authentication and authorization middleware
- **Content Directory**: `layers/`
- **Compatible Runtimes**: `nodejs22.x`
- **Retention Policy**: Retain

### Adding the Layer to Functions

To use the middleware layer, include it in the `Layers` property of your Lambda function in the `template.yaml` file:

```yaml
Layers:
  - !Ref AuthLayer
```

## Deploying to AWS

1. Package the application:

    ```bash
    sam package --output-template-file packaged.yml --s3-bucket your-s3-bucket-name
    ```

2. Deploy the application:

    ```bash
    sam deploy --template-file packaged.yml --stack-name short-url-backend --capabilities CAPABILITY_IAM
    ```

3. After deployment, note the API endpoint from the output.

## Environment Variables

The following environment variables are required:

- `DB_CNN`: MongoDB connection string.
- `SECRET_JWT_SEED`: Secret key for JWT.
- `EXPIRE_JWT`: Expiration time for JWT tokens (e.g., "2h").

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For any inquiries, please contact [andresjose84@gmail.com].