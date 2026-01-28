import Text from '@components/text/Text';
import type React from 'react';
import { StyleSheet } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import VStack from './VStack';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const renderStack = (jsx: React.ReactElement) => {
  let renderer: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(jsx);
  });
  return renderer!;
};

describe('VStack', () => {
  it('applies alignment, justify, gap, and full styles', () => {
    const renderer = renderStack(
      <VStack alignment="leading" justify="center" spacing={12} full>
        <Text>Item</Text>
      </VStack>,
    );
    const tree = renderer.toJSON();
    if (!tree || Array.isArray(tree) || typeof tree !== 'object') {
      throw new Error('Expected a single VStack node.');
    }

    const style = StyleSheet.flatten(tree.props.style);
    expect(style.alignItems).toBe('flex-start');
    expect(style.justifyContent).toBe('center');
    expect(style.gap).toBe(12);
    expect(style.flex).toBe(1);
  });
});
