import Text from '@components/text/Text';
import type React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Button from './Button';

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
    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Confirm' });
    expect(pressable.props.accessibilityLabel).toBe('Confirm');
    const text = renderer.root.findByType(Text);
    expect(text.props.children).toBe('Confirm');
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const renderer = renderButton(<Button title="Save" onPress={onPress} />);
    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Save' });

    ReactTestRenderer.act(() => {
      pressable.props.onPress();
    });
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables pressable and sets accessibility hint when disabled', () => {
    const renderer = renderButton(<Button title="Delete" onPress={jest.fn()} disabled />);
    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Delete' });

    expect(pressable.props.disabled).toBe(true);
    expect(pressable.props.accessibilityHint).toBe('Button is disabled');
    expect(pressable.props.accessibilityState).toEqual({ disabled: true, busy: false });
  });

  it('disables pressable when loading and sets busy state', () => {
    const renderer = renderButton(<Button title="Loading" onPress={jest.fn()} loading />);
    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Loading' });

    expect(pressable.props.disabled).toBe(true);
    expect(pressable.props.accessibilityState).toEqual({ disabled: false, busy: true });
  });

  it('uses link role and does not capitalize when variant is link', () => {
    const renderer = renderButton(
      <Button title="Forgot password?" onPress={jest.fn()} variant="link" />,
    );
    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Forgot password?' });

    expect(pressable.props.accessibilityRole).toBe('link');
    const text = renderer.root.findByType(Text);
    expect(text.props.capitalize).toBe(false);
  });
});
