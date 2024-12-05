# User Management API

A microservice for managing user data, built with Node.js, Express, and MongoDB.

## Tech Stack
- Node.js & Express
- MongoDB
- JWT Authentication

## Project Setup

```bash
# Install dependencies
npm install

# Run project
npm run dev
```

## Available Endpoints

### Public Endpoints
These endpoints can be accessed without authentication:

1. `POST api/users/add`
   - Creates a new user in the system

2. `GET api/users/all`
   - Retrieves all users from the system
   - Returns a list of user records

3. `POST api/auth/token`
   - Generates a JWT token for protected endpoints

### Protected Endpoints
These endpoints require a valid JWT token in the Authorization header:

1. `GET api/users/account/:accountNumber`
   - Retrieves a user by their account number
   - Replace `:accountNumber` with the actual account number

2. `GET api/users/identity/:identityNumber`
   - Retrieves a user by their identity number
   - Replace `:identityNumber` with the actual identity number

3. `PUT api/users/:id`
   - Updates a user's information
   - Replace `:id` with the user's ID

4. `DELETE api/users/:id`
   - Removes a user from the system
   - Replace `:id` with the user's ID

For detailed request/response examples and testing, please refer to the included Postman collection: `User_API.postman_collection.json`

## Environment Setup

Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/db_nowaf_betest
JWT_SECRET=jwt-nowaf-betest
JWT_EXPIRED=1h
PORT=3000
```
