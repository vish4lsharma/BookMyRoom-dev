# Troubleshooting Guide

## MongoDB Connection Issues

### Error: `querySrv ENOTFOUND _mongodb._tcp.123`

This error indicates that your MongoDB connection string is malformed. The system is trying to parse "123" as a MongoDB connection string.

**Solution:**

1. **Check your `.env` file** in the `backend` directory
2. Make sure `MONGODB_URI` is set correctly:

   **For Local MongoDB:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/bookmyroom
   ```

   **For MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookmyroom?retryWrites=true&w=majority
   ```

3. **Common mistakes:**
   - ❌ `MONGODB_URI=123` (just a number)
   - ❌ `MONGODB_URI=mongodb://` (incomplete)
   - ❌ `MONGODB_URI=localhost:27017` (missing protocol)
   - ✅ `MONGODB_URI=mongodb://localhost:27017/bookmyroom` (correct)

### Check Your Environment Variables

Run this command to verify your `.env` file:
```bash
npm run check-env
```

This will show you:
- Which variables are set
- Which variables are missing
- If your MongoDB URI format is correct

### Step-by-Step Fix

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Check if `.env` file exists:**
   ```bash
   # Windows
   dir .env
   
   # macOS/Linux
   ls -la .env
   ```

3. **If `.env` doesn't exist, create it:**
   ```bash
   # Copy from example (if exists)
   copy .env.example .env
   
   # Or create manually
   ```

4. **Edit `.env` file and ensure it has:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/bookmyroom
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:8081
   ```

5. **For Local MongoDB:**
   - Make sure MongoDB is installed
   - Start MongoDB service:
     ```bash
     # Windows
     net start MongoDB
     
     # macOS (if installed via Homebrew)
     brew services start mongodb-community
     
     # Linux
     sudo systemctl start mongod
     ```

6. **For MongoDB Atlas:**
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get connection string
   - Replace `<password>` with your actual password
   - Whitelist your IP address (or 0.0.0.0/0 for development)

7. **Verify connection:**
   ```bash
   npm run check-env
   npm run dev
   ```

## Port Issues

If server is running on port 3001 instead of 5000:

1. Check your `.env` file for `PORT=3001`
2. Either change it to `PORT=5000` or update frontend API URL

## Other Common Issues

### "Cannot find module" errors
```bash
npm install
```

### "Permission denied" errors
- Make sure you have write permissions
- On Linux/macOS, you might need `sudo` for some operations

### MongoDB not starting
- Check if MongoDB service is running
- Check MongoDB logs for errors
- Verify MongoDB is installed correctly

## Still Having Issues?

1. **Check the error message carefully** - it usually tells you what's wrong
2. **Verify all environment variables** using `npm run check-env`
3. **Check MongoDB connection** separately:
   ```bash
   # For local MongoDB
   mongosh mongodb://localhost:27017/bookmyroom
   
   # Or
   mongo mongodb://localhost:27017/bookmyroom
   ```
4. **Check server logs** - they often contain helpful error messages
5. **Verify file paths** - make sure you're in the correct directory

