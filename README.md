# Crypto Wallet Backend

Crypto Wallet is a secure and efficient cryptocurrency wallet built using the MERN stack. It enables users to create accounts, manage transactions, and securely store digital assets.

## Features

### User Authentication

- Secure registration and login system.
- Password hashing using bcrypt.
- JWT-based authentication for session management.

### Wallet & Transactions

- Create and manage cryptocurrency wallets.
- Secure transactions between users.
- Transaction history with timestamps.

### Security & Encryption

- JWT authentication for secure API access.
- Encrypted sensitive user information.
- Input validation to prevent injection attacks.

## Tech Stack

- **Frontend:** React.js (if applicable)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **API Security:** Middleware validation

## Installation & Setup

### Prerequisites

- Node.js & npm installed
- MongoDB installed and running

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdulMoiz2493/Crypto-Wallet.git
   cd Crypto-Wallet/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by creating a `.env` file in the root directory:
   ```plaintext
   PORT=your_port_number
   MONGO_DB_URL=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=your_access_token_expiry
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry
   NODE_ENV=your_environment
   INFURA_ID=your_infura_project_id
   ```
4. Start the backend server:
   ```bash
   npm run server
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Transactions

- `POST /api/transaction/send` - Send cryptocurrency
- `GET /api/transaction/history` - Get transaction history

## Usage

- Register an account and log in.
- Create a wallet and store cryptocurrencies.
- Send and receive transactions securely.
- View transaction history.

## License

This project is open-source and available under the [MIT License](LICENSE).


## Contact
If you have any questions, feel free to reach out:
- **Abdul Moiz**  
- Email: abdulmoiz8895@gmail.com 
- GitHub: [AbdulMoiz2493](https://github.com/AbdulMoiz2493)
 
