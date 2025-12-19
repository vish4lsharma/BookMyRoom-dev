// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Configure resolver to handle platform-specific modules
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Add alias for native-only modules on web
const path = require('path');
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Provide stubs for native-only modules on web
  if (platform === 'web') {
    if (moduleName === 'react-native-maps') {
      return {
        type: 'sourceFile',
        filePath: path.resolve(__dirname, 'web-stubs/react-native-maps.js'),
      };
    }
    if (moduleName === 'react-native-image-viewing') {
      return {
        type: 'sourceFile',
        filePath: path.resolve(__dirname, 'web-stubs/react-native-image-viewing.js'),
      };
    }
  }
  
  // Use default resolver
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
