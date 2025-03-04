# ChapApp - Real-Time Chat Application

A modern, feature-rich chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO for real-time communication.

## Features

- 🔐 User authentication and authorization
- 💬 Real-time messaging
- 📸 Image sharing capabilities
- 🌐 Real-time status updates
- 🎨 Modern and responsive UI with Tailwind CSS and DaisyUI
- 🔒 Secure password handling with bcrypt
- ☁️ Cloud storage integration with Cloudinary
- 🎯 State management using Zustand

## Tech Stack

### Frontend
- React.js with Vite
- Socket.IO Client for real-time communication
- Tailwind CSS & DaisyUI for styling
- React Router for navigation
- Axios for API requests
- Zustand for state management
- React Hot Toast for notifications

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- Socket.IO for real-time features
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Multer for file handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ChapApp
```

2. Install dependencies for both frontend and backend:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Running the Application

1. Start the backend server:
```bash
# From the root directory
npm start
```

2. Start the frontend development server:
```bash
# From the frontend directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Building for Production

To build the application for production:

```bash
# From the root directory
npm run build
```

This will:
1. Install all dependencies
2. Build the frontend
3. Prepare the application for production deployment

## Project Structure

```
ChapApp/
├── frontend/                # Frontend application
│   ├── src/                # Source files
│   ├── public/             # Public assets
│   └── dist/               # Production build
├── backend/                # Backend application
│   ├── src/               # Source files
│   └── .env               # Environment variables
└── package.json           # Root package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- React.js team for the amazing frontend library
- Socket.IO team for real-time capabilities
- Tailwind CSS and DaisyUI for the beautiful UI components
