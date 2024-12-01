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

5. Create a `.gitignore` file to exclude unnecessary files and directories from being tracked by Git. Add the following content to the `.gitignore` file:

    ```
    # Node.js
    node_modules/
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*

    # TypeScript
    *.tsbuildinfo

    # Logs
    logs
    *.log
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*

    # Environment variables
    .env

    # IDEs and editors
    .idea/
    .vscode/
    *.suo
    *.ntvs*
    *.njsproj
    *.sln
    *.sw?

    # MacOS
    .DS_Store

    # Miscellaneous
    .cache
    .parcel-cache
    ```






































