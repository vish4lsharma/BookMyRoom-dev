# Fix MongoDB URI Issue

## Problem Detected

Your MongoDB connection string has an extra `@123@` in it, which is causing the connection error.

**Current (WRONG):**
```
mongodb+srv://username:password@123@cluster0.3o7heik.mongodb.net/
```

**Should be (CORRECT):**
```
mongodb+srv://username:password@cluster0.3o7heik.mongodb.net/
```

## How to Fix

1. **Open your `.env` file** in the `backend` directory

2. **Find the line with `MONGODB_URI`**

3. **Remove the `@123@` part** from the connection string

4. **Correct format examples:**

   **MongoDB Atlas (what you're using):**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.3o7heik.mongodb.net/bookmyroom?retryWrites=true&w=majority
   ```
   
   **Important points:**
   - Replace `username` with your MongoDB Atlas username
   - Replace `password` with your MongoDB Atlas password
   - Make sure there's only ONE `@` symbol (between password and cluster)
   - Add database name after the cluster URL (e.g., `/bookmyroom`)
   - Add query parameters for better connection handling

5. **Save the file**

6. **Restart the server:**
   ```bash
   npm run dev
   ```

## Getting Your Correct MongoDB Atlas Connection String

1. Go to https://cloud.mongodb.com/
2. Log in to your account
3. Click on your cluster
4. Click "Connect"
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your actual password
8. Add your database name: `/bookmyroom` (before the `?`)
9. The final format should be:
   ```
   mongodb+srv://yourusername:yourpassword@cluster0.3o7heik.mongodb.net/bookmyroom?retryWrites=true&w=majority
   ```

## Verify the Fix

After fixing, run:
```bash
npm run check-env
```

You should see:
- ✅ MongoDB URI format looks correct
- No connection errors when starting the server

## Still Having Issues?

1. **Check MongoDB Atlas Network Access:**
   - Go to Network Access in MongoDB Atlas
   - Make sure your IP is whitelisted (or add 0.0.0.0/0 for development)

2. **Check Database User:**
   - Go to Database Access in MongoDB Atlas
   - Make sure your user has read/write permissions
   - Verify username and password are correct

3. **Test Connection:**
   - Try connecting using MongoDB Compass or mongosh
   - If it works there, the connection string is correct

