import Text from '@components/text/Text';
import type React from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { styles } from './styles';
import TextInput from './TextInput';

const renderInput = (jsx: React.ReactElement) => {
  let renderer: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(jsx);
  });
  return renderer!;
};

const findInputContainer = (renderer: ReactTestRenderer.ReactTestRenderer) => {
  const containers = renderer.root.findAllByType(View);
  const container = containers.find((node) => {
    const style = node.props.style;
    return Array.isArray(style) && style.includes(styles.inputContainer);
  });
  if (!container) {
    throw new Error('Input container not found.');
  }
  return container;
};

describe('TextInput', () => {
  it('renders label and error message', () => {
    const renderer = renderInput(<TextInput label="Nome" errorMessage="Campo obrigatorio" />);

    const texts = renderer.root.findAllByType(Text);
    const labels = texts.map((node) => node.props.children);
    expect(labels).toContain('Nome');
    expect(labels).toContain('Campo obrigatorio');
  });

  it('propagates change events and toggles focus styles', () => {
    const handleChange = jest.fn();
    const renderer = renderInput(<TextInput value="" onChangeText={handleChange} />);

    const input = renderer.root.findByType(RNTextInput);
    ReactTestRenderer.act(() => {
      input.props.onChangeText('Oi');
    });
    expect(handleChange).toHaveBeenCalledWith('Oi');

    const containerBefore = findInputContainer(renderer);
    const stylesBefore = containerBefore.props.style as unknown[];
    expect(stylesBefore).toContain(styles.inputWithoutFocused);

    ReactTestRenderer.act(() => {
      input.props.onFocus?.({});
    });

    const containerAfter = findInputContainer(renderer);
    const stylesAfter = containerAfter.props.style as unknown[];
    expect(stylesAfter).toContain(styles.inputFocused);
  });
});
