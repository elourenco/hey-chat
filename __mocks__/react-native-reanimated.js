const ReactNative = require('react-native');

const AnimatedMock = {
  View: ReactNative.View,
  Text: ReactNative.Text,
  Image: ReactNative.Image,
  ScrollView: ReactNative.ScrollView,
  FlatList: ReactNative.FlatList,
  call: () => {},
};

module.exports = {
  __esModule: true,
  default: AnimatedMock,
};
