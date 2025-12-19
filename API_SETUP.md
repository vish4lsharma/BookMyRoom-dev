# API Configuration Guide

## Network Request Failed - How to Fix

If you're getting "Network request failed" errors, follow these steps:

### 1. Check Backend Server

Make sure your backend is running:
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 3001
✅ MongoDB connected successfully
```

### 2. Update API URL for Your Device

The API URL is configured in `services/api.js`. Update it based on your setup:

#### For Android Emulator:
Already configured: `http://10.0.2.2:3001/api`

#### For iOS Simulator:
Already configured: `http://localhost:3001/api`

#### For Physical Device (Phone/Tablet):

1. Find your computer's IP address:
   - **Windows**: Open Command Prompt and run `ipconfig`
     - Look for "IPv4 Address" under your active network adapter
     - Example: `192.168.1.100`
   - **Mac/Linux**: Run `ifconfig` or `ip addr`
     - Look for inet address (usually starts with 192.168.x.x)

2. Update `services/api.js`:
   ```javascript
   const API_BASE_URL = __DEV__ 
     ? (Platform.OS === 'android' 
         ? 'http://10.0.2.2:3001/api'  // Android emulator
         : 'http://YOUR_IP_ADDRESS:3001/api')  // iOS simulator or physical device
     : 'https://your-production-api.com/api';
   ```

   Replace `YOUR_IP_ADDRESS` with your actual IP (e.g., `192.168.1.100`)

3. Make sure your phone and computer are on the same WiFi network

4. Check firewall:
   - Windows: Allow Node.js through Windows Firewall
   - Mac: System Preferences → Security → Firewall

### 3. Verify Backend Port

Check what port your backend is running on:
- Look at backend console output
- Default is 3001 (as set in backend/.env)
- If different, update API_BASE_URL accordingly

### 4. Test Backend Connection

Open in browser:
- `http://localhost:3001/api/health` (from computer)
- Should return: `{"status":"OK","message":"BookMyRoom API is running"}`

### 5. Common Issues

**Issue**: "Network request failed" on physical device
**Solution**: Use your computer's IP address, not localhost

**Issue**: "Connection refused"
**Solution**: 
- Check backend is running
- Check port number matches
- Check firewall settings

**Issue**: Works on emulator but not physical device
**Solution**: Update API URL to use your computer's IP address

## Quick Fix

1. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update `services/api.js` line 8 with your IP
3. Restart Expo: `npm start`
4. Reload app

