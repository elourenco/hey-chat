import Text from '@components/text/Text';
import type React from 'react';
import { StyleSheet } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import HStack from './HStack';

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

describe('HStack', () => {
  it('applies alignment, justify, gap, and full styles', () => {
    const renderer = renderStack(
      <HStack alignment="center" justify="space-between" spacing={-8} full>
        <Text>Item</Text>
      </HStack>,
    );
    const tree = renderer.toJSON();
    if (!tree || Array.isArray(tree) || typeof tree !== 'object') {
      throw new Error('Expected a single HStack node.');
    }

    const style = StyleSheet.flatten(tree.props.style);
    expect(style.alignItems).toBe('center');
    expect(style.justifyContent).toBe('space-between');
    expect(style.gap).toBe(0);
    expect(style.flex).toBe(1);
  });
});
