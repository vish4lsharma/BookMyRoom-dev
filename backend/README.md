# BookMyRoom Backend API

Backend server for BookMyRoom application built with Node.js, Express, and MongoDB.

## Features

- User authentication (OTP-based and password-based)
- Room/Listing management (CRUD operations)
- Booking system
- Wishlist functionality
- Messaging system
- Reviews and ratings
- Transport services
- Image uploads
- MongoDB database integration

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bookmyroom
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:8081
```

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Run the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone number
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with password
- `GET /api/auth/me` - Get current user

### Rooms
- `GET /api/rooms` - Get all rooms (with filters)
- `GET /api/rooms/featured` - Get featured rooms
- `GET /api/rooms/:id` - Get single room
- `POST /api/rooms` - Create room (Host only)
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

### Bookings
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/:roomId` - Add to wishlist
- `DELETE /api/wishlist/:roomId` - Remove from wishlist
- `GET /api/wishlist/check/:roomId` - Check if room is wishlisted

### Messages
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/conversations/:id` - Get conversation with messages
- `POST /api/messages/conversations` - Create conversation
- `POST /api/messages` - Send message
- `PUT /api/messages/conversations/:id/archive` - Archive conversation

### Reviews
- `GET /api/reviews/room/:roomId` - Get reviews for room
- `POST /api/reviews` - Create review

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `PUT /api/profile/role` - Update user role

### Transport
- `GET /api/transport` - Get transport services
- `GET /api/transport/:id` - Get single transport service
- `POST /api/transport` - Create transport service
- `PUT /api/transport/:id` - Update transport service

### Upload
- `POST /api/upload` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images

## Database Models

- **User** - User accounts and authentication
- **Room** - Room listings
- **Booking** - Room bookings
- **Wishlist** - User wishlists
- **Message** - Chat messages
- **Conversation** - Chat conversations
- **Review** - Room reviews
- **Transport** - Transport services

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use MongoDB Atlas or AWS DocumentDB
3. Configure environment variables
4. Use a process manager like PM2
5. Set up reverse proxy (nginx)
6. Enable HTTPS
7. Configure CORS properly
8. Set up image storage (AWS S3 or Cloudinary)

## AWS Deployment

See `aws-deployment.md` for detailed AWS deployment instructions.

