import TextInput from '@components/text-input/TextInput';
import { useField } from 'formik';
import type React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import PasswordInput from './PasswordInput';

jest.mock('formik', () => ({
  useField: jest.fn(),
}));

const mockUseField = useField as jest.Mock;

const renderInput = (jsx: React.ReactElement) => {
  let renderer: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(jsx);
  });
  return renderer!;
};

describe('PasswordInput', () => {
  beforeEach(() => {
    mockUseField.mockReset();
  });

  it('maps formik state and shows validation errors', () => {
    const setValue = jest.fn();
    const setTouched = jest.fn();
    mockUseField.mockReturnValue([
      { value: '123' },
      { touched: true, error: 'Senha invalida' },
      { setValue, setTouched },
    ]);

    const renderer = renderInput(<PasswordInput />);
    const input = renderer.root.findByType(TextInput);

    expect(input.props.placeholder).toBe('Senha');
    expect(input.props.secureTextEntry).toBe(true);
    expect(input.props.maxLength).toBe(255);
    expect(input.props.errorMessage).toBe('Senha invalida');
    expect(input.props.value).toBe('123');

    ReactTestRenderer.act(() => {
      input.props.onChangeText('abc');
    });
    expect(setValue).toHaveBeenCalledWith('abc');

    ReactTestRenderer.act(() => {
      input.props.onBlur();
    });
    expect(setTouched).toHaveBeenCalledWith(true);
  });
});
