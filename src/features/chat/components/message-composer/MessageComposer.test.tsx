import Text from '@components/text/Text';
import type React from 'react';
import { Pressable } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import MessageComposer from './MessageComposer';

const renderComposer = (jsx: React.ReactElement) => {
  let renderer: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(jsx);
  });
  return renderer!;
};

describe('MessageComposer', () => {
  it('blocks send when input is empty', () => {
    const onSend = jest.fn();
    const renderer = renderComposer(
      <MessageComposer value="  " onChangeText={jest.fn()} onSend={onSend} />,
    );

    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Enviar mensagem' });
    ReactTestRenderer.act(() => {
      pressable.props.onPress();
    });

    expect(onSend).not.toHaveBeenCalled();
    expect(pressable.props.disabled).toBe(true);
  });

  it('calls onSend when enabled', () => {
    const onSend = jest.fn();
    const renderer = renderComposer(
      <MessageComposer value="Oi" onChangeText={jest.fn()} onSend={onSend} />,
    );

    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Enviar mensagem' });
    ReactTestRenderer.act(() => {
      pressable.props.onPress();
    });

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(pressable.props.accessibilityState).toEqual({ disabled: false, busy: false });
  });

  it('shows sending state label and busy accessibility', () => {
    const renderer = renderComposer(
      <MessageComposer value="Oi" onChangeText={jest.fn()} onSend={jest.fn()} isSending />,
    );

    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Enviar mensagem' });
    const texts = renderer.root.findAllByType(Text);
    const labels = texts.map((node) => node.props.children);

    expect(labels).toContain('Enviando');
    expect(pressable.props.accessibilityState).toEqual({ disabled: true, busy: true });
  });
});
