# TuniTalk

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Project

To run this project, execute the following command in your terminal:

```bash
docker-compose up --build
```

This command will build and start all the necessary containers for the project.

### APIs
The API endpoints are available at:

#### Register
```http
POST http://localhost:3000/auth/register
```

Example request body:
```json
{
    "username": "test",
    "email": "email@exemple.com",
    "password": "password123"
}
```

#### Login
```http
POST http://localhost:3000/auth/login
```

Example request body:
```json
{
    "email": "email@exemple.com",
    "password": "password123"
}
```

### How this project is setup

1. `npm init -y`
   - Initializes a new Node.js project with default settings. The `-y` flag automatically answers "yes" to all prompts, creating a `package.json` file with default values.

2. `npm install express bcrypt jsonwebtoken pg`
   - Installs the following dependencies:
     - `express`: A web framework for Node.js, used to build web applications and APIs.
     - `bcrypt`: A library to help hash passwords.
     - `jsonwebtoken`: A library to create and verify JSON Web Tokens (JWTs), used for authentication.
     - `pg`: A PostgreSQL client for Node.js, used to interact with PostgreSQL databases.

3. `npm install -D typescript @types/node @types/express @types/bcrypt @types/jsonwebtoken ts-node-dev`
   - Installs the following development dependencies:
     - `typescript`: A superset of JavaScript that adds static types.
     - `@types/node`: Type definitions for Node.js.
     - `@types/express`: Type definitions for Express.
     - `@types/bcrypt`: Type definitions for bcrypt.
     - `@types/jsonwebtoken`: Type definitions for jsonwebtoken.
     - `ts-node-dev`: A development tool that compiles TypeScript files and restarts the server on changes.

4. `npm install nodemon`
   - Installs `nodemon`, a tool that automatically restarts the Node.js application when file changes in the directory are detected.