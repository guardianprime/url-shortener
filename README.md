# URL Shortener

A full-stack web application for shortening URLs with user authentication. Users can create short URLs, manage their own URLs, and track click statistics.

## Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **User Authentication**: Sign up and log in to manage personal URLs
- **Custom Aliases**: Create custom short codes for URLs
- **URL Management**: View, copy, and delete your shortened URLs
- **Click Tracking**: Track the number of clicks on your shortened URLs
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- FontAwesome Icons

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/guardianprime/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   ```

## Environment Setup

### Backend Environment Variables

Create a `.env.development.local` file in the `BACKEND` directory with the following variables:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/url-shortener
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
BASE_URL=http://localhost:8000
```

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `BASE_URL`: The base URL where the app will be hosted

### Frontend Environment Variables

Create a `.env.local` file in the `FRONTEND` directory:

```env
VITE_API_URL=http://localhost:8000
```

## Running the Application

### Development Mode

To run both frontend and backend concurrently in development mode:

```bash
npm run dev
```

This will start:

- Backend server on http://localhost:8000
- Frontend development server on http://localhost:5173 (default Vite port)

### Production Mode

1. Build the frontend:

   ```bash
   npm run build
   ```

2. Start the backend:
   ```bash
   npm start
   ```

The application will be available at http://localhost:8000

## API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login

### URL Shortening

- `POST /api/v1/shorten` - Create a short URL (authenticated users can associate URLs with their account)
- `GET /api/v1/shorten/urls` - Get user's URLs (requires authentication)
- `GET /api/v1/shorten/urls/:id` - Get specific URL details (requires authentication)
- `DELETE /api/v1/shorten/url/:id` - Delete a URL (requires authentication)

### URL Redirection

- `GET /:shortCode` - Redirect to the original URL

## Project Structure

```
url-shortener/
├── BACKEND/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── configs/
│   ├── app.js
│   └── package.json
├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── config/
│   ├── public/
│   ├── index.html
│   └── package.json
├── package.json
└── README.md
```

## Usage

1. Open the application in your browser
2. Sign up for a new account or log in
3. Enter a long URL in the form to shorten it
4. Optionally provide a custom alias
5. Copy the shortened URL and share it
6. View your shortened URLs in the "My URLs" section
7. Track clicks and manage your URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
