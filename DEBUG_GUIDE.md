# Debug Guide - App Stuck on Splash Screen

## Quick Fixes to Try

### 1. Clear Cache and Restart
```bash
# Stop the Expo server (Ctrl+C)
# Clear cache
npx expo start -c

# Or clear everything
npm start -- --clear
```

### 2. Check Metro Bundler Console
Look for any red error messages in the terminal where you ran `npm start`. Common errors:
- Module not found
- Image not found
- Syntax errors
- Import errors

### 3. Check Device/Emulator Console
- **Android**: Open Logcat in Android Studio
- **iOS**: Check Xcode console
- **Expo Go**: Shake device → "Show Dev Menu" → "Debug Remote JS"

### 4. Test with Simple Screen
Temporarily rename `index.jsx` to `index.jsx.backup` and create a simple test:

```jsx
// app/index.jsx
import { View, Text } from 'react-native';

export default function Test() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App is working!</Text>
    </View>
  );
}
```

If this works, the issue is in the original index.jsx.

### 5. Check Image Assets
Verify these files exist:
- `assets/images/welcome-bg.jpg`
- `assets/images/splash-icon.png`
- `assets/images/icon.png`

### 6. Check Dependencies
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Or on Windows
rmdir /s node_modules
npm install
```

### 7. Check for JavaScript Errors
Open the app and check:
- Metro bundler console for errors
- Browser console (if using web)
- Device logs

### 8. Verify Backend is Not Blocking
The app should load even if backend is down. But check:
- Is backend running? (Should be on port 3001 or 5000)
- Any network errors in console?

### 9. Check Expo Version
```bash
npx expo --version
# Should match your package.json version
```

### 10. Reset Expo
```bash
# Clear Expo cache
expo start -c

# Or reset completely
expo r -c
```

## Common Issues and Solutions

### Issue: "Unable to resolve module"
**Solution**: Run `npm install` and check if the module exists in `node_modules`

### Issue: "Image not found"
**Solution**: Verify image paths are correct and files exist

### Issue: "Cannot read property of undefined"
**Solution**: Check component props and ensure all required props are passed

### Issue: "Network request failed"
**Solution**: Check API URL in `services/api.js` - app should still load even if API is down

### Issue: Splash screen never hides
**Solution**: The `_layout.jsx` should handle this. Check if `SplashScreen.hideAsync()` is being called

## Still Not Working?

1. **Check the exact error message** in Metro bundler
2. **Share the error** - copy the full error message
3. **Check React Native version compatibility**
4. **Try on a different device/emulator**
5. **Check Expo Go version** - update if needed

## Test Steps

1. Start fresh:
   ```bash
   npm start -- --clear
   ```

2. Open in Expo Go or emulator

3. Check console for errors

4. If you see the splash screen but nothing else:
   - Wait 2-3 seconds
   - Check if there are any errors
   - Try shaking device and reloading

5. If still stuck:
   - Check `app/_layout.jsx` - ensure splash screen hiding logic works
   - Check `app/index.jsx` - ensure it exports correctly
   - Check all imports in index.jsx

