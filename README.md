# BookMyRoom - Complete Booking Platform

A full-stack room booking application built with React Native (Expo) and Node.js, featuring real-time bookings, messaging, wishlists, and more.

## 🚀 Features

### Frontend (React Native/Expo)
- **User Authentication** - OTP-based and password-based login
- **Room Listings** - Browse and search rooms with advanced filters
- **Booking System** - Real-time room booking with availability checks
- **Wishlist** - Save favorite rooms
- **Messaging** - Chat with hosts and support
- **Reviews & Ratings** - Rate and review stays
- **Transport Services** - Book transport services
- **Profile Management** - Update profile and preferences
- **Host Onboarding** - Become a host and list your property

### Backend (Node.js/Express/MongoDB)
- RESTful API with comprehensive endpoints
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Image upload support
- Real-time messaging support
- Secure password hashing
- Input validation and error handling

## 📁 Project Structure

```
BookMyRoom-dev/
├── app/                    # Expo Router pages
│   ├── explore/           # Explore/Home screen
│   ├── listing/           # Room details
│   ├── search/            # Search functionality
│   ├── results/           # Search results
│   ├── wishlist/          # Wishlist screen
│   ├── messages/          # Messaging
│   ├── profile/           # User profile
│   ├── become-host/       # Host onboarding
│   └── transport/         # Transport services
├── components/            # Reusable components
├── services/              # API services
│   ├── api.js            # API client
│   └── authService.js    # Authentication service
├── backend/               # Backend server
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── utils/            # Utility functions
└── styles/               # Style files
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- Expo CLI (`npm install -g expo-cli`)

### Frontend Setup

1. Navigate to project root:
```bash
cd BookMyRoom-dev
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint in `services/api.js`:
```javascript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000/api' 
  : 'https://your-production-api.com/api';
```

4. Start Expo development server:
```bash
npm start
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bookmyroom
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:8081
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📱 Running the App

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Web
```bash
npm run web
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Rooms
- `GET /api/rooms` - Get all rooms (with filters)
- `GET /api/rooms/featured` - Get featured rooms
- `GET /api/rooms/:id` - Get room details
- `POST /api/rooms` - Create room (Host)
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/:roomId` - Add to wishlist
- `DELETE /api/wishlist/:roomId` - Remove from wishlist

### Messages
- `GET /api/messages/conversations` - Get conversations
- `POST /api/messages` - Send message

### Reviews
- `GET /api/reviews/room/:roomId` - Get room reviews
- `POST /api/reviews` - Create review

See `backend/README.md` for complete API documentation.

## 🗄️ Database Models

- **User** - User accounts and authentication
- **Room** - Room listings with full details
- **Booking** - Room bookings and reservations
- **Wishlist** - User wishlists
- **Message** - Chat messages
- **Conversation** - Chat conversations
- **Review** - Room reviews and ratings
- **Transport** - Transport services

## 🚀 Deployment

### Backend Deployment

See `backend/aws-deployment.md` for detailed AWS deployment instructions.

Quick deployment options:
- **AWS EC2** - Traditional server deployment
- **AWS Elastic Beanstalk** - Platform-as-a-Service
- **AWS ECS/Fargate** - Container-based deployment
- **Heroku** - Simple PaaS deployment
- **Docker** - Container deployment

### Frontend Deployment

1. Build for production:
```bash
expo build:android
expo build:ios
```

2. Or use EAS Build:
```bash
eas build --platform android
eas build --platform ios
```

3. Deploy to app stores:
- Google Play Store (Android)
- Apple App Store (iOS)

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- Secure API endpoints

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
npm test
```

## 📝 Environment Variables

### Frontend
- `API_BASE_URL` - Backend API URL

### Backend
- `PORT` - Server port
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - JWT expiration time
- `FRONTEND_URL` - Frontend URL for CORS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

## 🎯 Roadmap

- [ ] Real-time notifications
- [ ] Payment integration
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Offline support
- [ ] Push notifications
- [ ] Social media integration

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community
- MongoDB for the database solution

---

**Built with ❤️ using React Native, Node.js, and MongoDB**
