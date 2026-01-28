import Text from '@components/text/Text';
import type React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Button from './Button';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const renderButton = (jsx: React.ReactElement) => {
  let renderer: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(jsx);
  });
  return renderer!;
};

describe('Button', () => {
  it('renders title and accessibility label', () => {
    const renderer = renderButton(<Button title="Confirm" onPress={jest.fn()} />);
    const tree = renderer.toJSON();
    if (!tree || Array.isArray(tree) || typeof tree !== 'object') {
      throw new Error('Expected a single Pressable node.');
    }

    expect(tree.props.accessibilityLabel).toBe('Confirm');
    const text = renderer.root.findByType(Text);
    expect(text.props.children).toBe('Confirm');
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const renderer = renderButton(<Button title="Save" onPress={onPress} />);
    const tree = renderer.toJSON();
    if (!tree || Array.isArray(tree) || typeof tree !== 'object') {
      throw new Error('Expected a single Pressable node.');
    }

    ReactTestRenderer.act(() => {
      tree.props.onPress();
    });
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables pressable and sets accessibility hint when disabled', () => {
    const renderer = renderButton(<Button title="Delete" onPress={jest.fn()} disabled />);
    const tree = renderer.toJSON();
    if (!tree || Array.isArray(tree) || typeof tree !== 'object') {
      throw new Error('Expected a single Pressable node.');
    }

    expect(tree.props.disabled).toBe(true);
    expect(tree.props.accessibilityHint).toBe('Button is disabled');
    expect(tree.props.accessibilityState).toEqual({ disabled: true, busy: false });
  });

  it('disables pressable when loading and sets busy state', () => {
    const renderer = renderButton(<Button title="Loading" onPress={jest.fn()} loading />);
    const tree = renderer.toJSON();
    if (!tree || Array.isArray(tree) || typeof tree !== 'object') {
      throw new Error('Expected a single Pressable node.');
    }

    expect(tree.props.disabled).toBe(true);
    expect(tree.props.accessibilityState).toEqual({ disabled: false, busy: true });
  });

  it('uses link role and does not capitalize when variant is link', () => {
    const renderer = renderButton(
      <Button title="Forgot password?" onPress={jest.fn()} variant="link" />,
    );
    const tree = renderer.toJSON();
    if (!tree || Array.isArray(tree) || typeof tree !== 'object') {
      throw new Error('Expected a single Pressable node.');
    }

    expect(tree.props.accessibilityRole).toBe('link');
    const text = renderer.root.findByType(Text);
    expect(text.props.capitalize).toBe(false);
  });
});
