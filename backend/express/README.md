# URL Shortener API 🔗

A robust and scalable REST API for creating and managing short URLs, built with Node.js, Express, MongoDB and TypeScript.

## 🚀 Features

- Custom short URL creation
- JWT Authentication
- User roles (admin/user)
- Swagger Documentation
- Data validation
- Error handling
- MongoDB persistence

## 🛠️ Technologies

- Node.js
- Express
- TypeScript
- MongoDB
- JWT
- Swagger
- bcrypt
- class-validator

## 📋 Requirements

- Node.js 18.x or higher
- Docker Desktop (recommended) or MongoDB 5.x locally installed
- npm or yarn as package manager
- Environment variables configured (see .env.template)

### Database

- Option 1: Docker Desktop installed to run MongoDB in container
- Option 2: MongoDB 5.x locally installed

## 🚀 Deployment

1. Clone repository
    ```bash
    git clone <repository-url>
    ```

2. Install dependencies
    ```bash
    npm install
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
    npm run dev
    ```

6. Initialize database (optional)
    ```bash
    # Access this endpoint to populate the database with initial data
    http://localhost:3001/api/v1.0/seed/
    ```

## 📝 API Documentation
Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3001/api/v1.0/docs
```

## 👓 Author

- [@andresjose84](https://github.com/andresjose84)

## Licencia

[MIT](LICENSE)