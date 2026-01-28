import TextInput from '@components/text-input/TextInput';
import { useField } from 'formik';
import type React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import NameInput from './NameInput';

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

describe('NameInput', () => {
  beforeEach(() => {
    mockUseField.mockReset();
  });

  it('maps formik field to TextInput props', () => {
    const setValue = jest.fn();
    const setTouched = jest.fn();
    mockUseField.mockReturnValue([{ value: 'Ana' }, {}, { setValue, setTouched }]);

    const renderer = renderInput(<NameInput />);
    const input = renderer.root.findByType(TextInput);

    expect(input.props.placeholder).toBe('Digita o seu nome');
    expect(input.props.maxLength).toBe(255);
    expect(input.props.autoCapitalize).toBe('none');
    expect(input.props.autoComplete).toBe('name');
    expect(input.props.value).toBe('Ana');

    ReactTestRenderer.act(() => {
      input.props.onChangeText('Novo Nome');
    });
    expect(setValue).toHaveBeenCalledWith('Novo Nome');

    ReactTestRenderer.act(() => {
      input.props.onBlur();
    });
    expect(setTouched).toHaveBeenCalledWith(true);
  });
});
