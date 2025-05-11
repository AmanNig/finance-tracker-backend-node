# Finance Tracker

A web application to track income, expenses, and budgets, with user authentication and reporting features. Built with Node.js, Express, Prisma, and PostgreSQL.

## Features

- **User Authentication**: Register and log in securely with JWT-based authentication.
- **Transaction Management**: Add, view, and delete income or expense transactions.
- **Budgeting**: (Model present, endpoints can be added) Track budgets by category.
- **Reports**: (Extendable) Easily fetch all transactions for reporting.
- **RESTful API**: Well-structured endpoints for integration with any frontend.
- **Dockerized**: Ready for containerized deployment.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: JWT
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database (local or cloud)
- Docker (optional, for containerized deployment)

### Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

### Installation

```bash
# Install dependencies
npm install

# Set up the database (run migrations)
npx prisma migrate deploy

# Start the development server
npm run dev
```

The server will run on `http://localhost:8080` by default.

### Docker

To run the app in a Docker container:

```bash
docker build -t finance-tracker .
docker run -p 8080:8080 --env-file .env finance-tracker
```

## API Endpoints

### Auth

- `POST /api/auth/register`  
  Register a new user.  
  **Body:** `{ "email": "user@example.com", "password": "yourpassword", "name": "Your Name" }`

- `POST /api/auth/login`  
  Log in and receive a JWT token.  
  **Body:** `{ "email": "user@example.com", "password": "yourpassword" }`  
  **Response:** `{ token, user }`

### Transactions

All transaction endpoints require the `Authorization: Bearer <token>` header.

- `POST /api/transactions`  
  Create a new transaction.  
  **Body:**  
  ```json
  {
    "type": "income" | "expense",
    "amount": 100.0,
    "category": "Salary",
    "description": "June salary"
  }
  ```

- `GET /api/transactions`  
  Get all transactions for the authenticated user.

- `DELETE /api/transactions/:id`  
  Delete a transaction by its ID.

## Database Models

Defined in `prisma/schema.prisma`:

- **User**: `id`, `email`, `password`, `name`, `createdAt`
- **Transaction**: `id`, `userId`, `type`, `category`, `amount`, `description`, `date`
- **Budget**: `id`, `userId`, `category`, `amount`, `createdAt`

## Project Structure

```
.
├── app.js                # Entry point
├── controllers/          # Business logic for auth and transactions
├── middlewares/          # JWT authentication middleware
├── routes/               # API route definitions
├── prisma/               # Prisma schema and migrations
├── Dockerfile            # Docker configuration
├── .env                  # Environment variables
└── package.json          # Project metadata and scripts
```

## Contributing

Feel free to open issues or submit pull requests for improvements or new features!

## License

ISC
