# BookMyRoom - Complete Setup Guide

This guide will help you set up the complete BookMyRoom application from scratch.

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- MongoDB installed locally OR MongoDB Atlas account
- Expo CLI installed globally (`npm install -g expo-cli`)
- Code editor (VS Code recommended)

## Step 1: Clone and Install Dependencies

```bash
# Navigate to project directory
cd BookMyRoom-dev

# Install frontend dependencies
npm install

# Navigate to backend directory
cd backend

# Install backend dependencies
npm install
```

## Step 2: MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # On macOS/Linux
   mongod
   
   # On Windows
   net start MongoDB
   ```

### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create database user
4. Whitelist your IP address (or 0.0.0.0/0 for development)
5. Get connection string

## Step 3: Backend Configuration

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   # Or create manually
   ```

3. Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/bookmyroom
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookmyroom
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:8081
   ```

4. Start backend server:
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

5. Verify backend is running:
   - Open http://localhost:5000/api/health
   - You should see: `{"status":"OK","message":"BookMyRoom API is running"}`

## Step 4: Frontend Configuration

1. Navigate to project root:
   ```bash
   cd ..  # Back to BookMyRoom-dev
   ```

2. Update API configuration in `services/api.js`:
   - For Android emulator: Already configured to use `http://10.0.2.2:5000/api`
   - For iOS simulator: Already configured to use `http://localhost:5000/api`
   - For physical device: Update to your computer's IP address:
     ```javascript
     const API_BASE_URL = 'http://192.168.x.x:5000/api';
     ```

3. Start Expo development server:
   ```bash
   npm start
   ```

4. Choose your platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## Step 5: Testing the Application

### Test Authentication

1. Open the app
2. Enter a 10-digit phone number
3. Click "CONFIRM"
4. Check backend console for OTP (in development mode, OTP is logged)
5. Enter the OTP
6. You should be logged in and redirected to Explore screen

### Test Room Listings

1. Navigate to Explore screen
2. You should see rooms (if any exist in database)
3. Click on a room to view details
4. Try adding to wishlist

### Create Test Data

You can create test data using the API or by adding directly to MongoDB:

```javascript
// Example: Create a test room via API
// Use Postman or curl:
POST http://localhost:5000/api/rooms
Headers: Authorization: Bearer YOUR_JWT_TOKEN
Body:
{
  "title": "Cozy Room in Downtown",
  "subtitle": "Private Room",
  "description": "A beautiful private room in the heart of the city",
  "city": "Bareilly",
  "price": {
    "weekday": 1000,
    "weekend": 1200,
    "unit": "day"
  },
  "placeType": "Private room",
  "stayType": "Room",
  "guests": {
    "adults": 2,
    "children": 0
  },
  "bedrooms": 1,
  "beds": 1,
  "bathrooms": 1,
  "amenities": ["Wifi", "Kitchen", "AC"],
  "highlights": ["Great location", "Clean"]
}
```

## Step 6: Production Deployment

### Backend Deployment

See `backend/aws-deployment.md` for detailed AWS deployment instructions.

Quick steps:
1. Set up MongoDB Atlas (production)
2. Deploy backend to AWS EC2/Elastic Beanstalk
3. Update environment variables
4. Configure domain and SSL

### Frontend Deployment

1. Update API URL in `services/api.js`:
   ```javascript
   const API_BASE_URL = 'https://your-production-api.com/api';
   ```

2. Build for production:
   ```bash
   # Android
   expo build:android
   
   # iOS
   expo build:ios
   ```

3. Submit to app stores

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure IP is whitelisted (for Atlas)

**Port Already in Use:**
- Change PORT in `.env`
- Or kill process using port 5000:
  ```bash
  # macOS/Linux
  lsof -ti:5000 | xargs kill
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Frontend Issues

**Cannot Connect to API:**
- Verify backend is running
- Check API_BASE_URL in `services/api.js`
- For physical device, use computer's IP address
- Check firewall settings

**Expo Go Connection Issues:**
- Ensure phone and computer are on same network
- Try using tunnel mode: `expo start --tunnel`

### Common Errors

**"Network request failed":**
- Backend not running
- Wrong API URL
- CORS issues (check backend CORS configuration)

**"Unauthorized" errors:**
- Token expired or invalid
- User not logged in
- Check authentication flow

## Next Steps

1. **Configure OTP Service:**
   - Set up Twilio account
   - Update `backend/utils/sendOTP.js` with Twilio credentials
   - Update `.env` with Twilio credentials

2. **Set up Image Storage:**
   - Configure AWS S3 or Cloudinary
   - Update upload routes
   - Update image URLs in frontend

3. **Add Payment Integration:**
   - Integrate payment gateway (Stripe, Razorpay, etc.)
   - Update booking flow

4. **Enable Push Notifications:**
   - Set up Expo Push Notifications
   - Configure notification service

5. **Add Analytics:**
   - Integrate analytics service
   - Track user behavior

## Support

For issues:
1. Check this guide
2. Review error logs
3. Check GitHub issues
4. Contact development team

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

Happy coding! 🚀

