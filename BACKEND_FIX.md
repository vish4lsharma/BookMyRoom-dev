# Backend Connection Fix

## Issue
The app cannot connect to the backend server even though it's running on port 3001.

## Solution

### 1. Restart Backend Server
The CORS configuration has been updated. You need to restart the backend:

```bash
# In the backend terminal, press Ctrl+C to stop
# Then restart:
cd backend
npm run dev
```

### 2. Verify Backend is Running
You should see:
```
🚀 Server running on port 3001
✅ MongoDB connected successfully
```

### 3. Test Backend Connection
From your computer, test:
```bash
curl http://localhost:3001/api/health
```

Should return: `{"status":"OK","message":"BookMyRoom API is running"}`

### 4. Android Emulator Configuration
The backend is now configured to accept requests from:
- `http://localhost:8081` (Expo web)
- `http://localhost:19006` (Expo dev server)
- `http://10.0.2.2:8081` (Android emulator)
- `http://10.0.2.2:19006` (Android emulator)

### 5. If Still Not Working

**Check Backend Logs:**
- Look for CORS errors in the backend terminal
- Check if requests are reaching the backend

**Verify API URL:**
- The app is configured to use `http://10.0.2.2:3001/api` for Android emulator
- This is correct and should work

**Firewall:**
- Make sure Windows Firewall allows Node.js
- Port 3001 should be accessible

**Network:**
- For Android emulator: `10.0.2.2` is the special IP that maps to your computer's localhost
- This should work automatically

## Quick Fix Steps

1. **Stop backend** (Ctrl+C in backend terminal)
2. **Restart backend**: `cd backend && npm run dev`
3. **Reload app** in Expo (press `r` in Expo terminal)
4. **Try signup again**

The CORS configuration has been updated to allow Android emulator requests.

