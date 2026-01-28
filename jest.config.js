module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^react-native/Libraries/Animated/NativeAnimatedHelper$':
      '<rootDir>/__mocks__/NativeAnimatedHelper.js',
    '^react-native-reanimated$': '<rootDir>/__mocks__/react-native-reanimated.js',
    '^@react-native-community/netinfo$': '<rootDir>/__mocks__/react-native-community-netinfo.js',
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|react-native-config|react-native-screens|react-native-safe-area-context|@reduxjs/toolkit|immer)/)',
  ],
};
