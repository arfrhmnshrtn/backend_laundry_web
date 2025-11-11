# Laundry Web Backend

## Installation

```bash
npm install
```

## Configuration

Copy `.env` file and configure your environment variables.

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Project Structure

```
backend/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Custom middleware
│   ├── models/       # Data models
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions
│   └── app.js        # Express app configuration
├── index.js          # Application entry point
├── .env              # Environment variables
└── package.json      # Dependencies
```

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
