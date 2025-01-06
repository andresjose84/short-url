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

2. Edit template.yaml and set environment var DB CNN with MongoDB string connection.

## Running Locally

1. Start the SAM local environment:

    ```bash
    sam local start-api
    ```

2. Use NPM to running local

    ```bash
    npm run dev
    ```

3. Using docker MongoDB and NPM

    ```bash
    docker-compose up -d
    npm run dev:samlocal
    ```

4. Testing data

    <http://localhost:3000/api/v1.0/seed>

5. The API will be available at `http://localhost:3000`.

## Deploying to AWS

1. Package the application:

    ```bash
    sam package --output-template-file template.yml --s3-bucket your-s3-bucket-name
    ```

2. Deploy the application:

    ```bash
    sam deploy --template-file template.yml --stack-name short-url-backend --capabilities CAPABILITY_IAM
    ```

3. After deployment, note the API endpoint from the output.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For any inquiries, please contact [andresjose84@gmail.com].
