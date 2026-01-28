module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
        ],
        alias: {
          '@app': './src/app',
          '@assets': './src/assets',
          '@components': './src/components',
          '@features': './src/features',
          '@entities': './src/entities',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
