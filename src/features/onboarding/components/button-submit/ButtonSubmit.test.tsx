import { useFormikContext } from 'formik';
import type React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import ButtonSubmit from './ButtonSubmit';

jest.mock('formik', () => ({
  useFormikContext: jest.fn(),
}));

const mockUseFormikContext = useFormikContext as jest.Mock;

const renderButton = (jsx: React.ReactElement) => {
  let renderer: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(jsx);
  });
  return renderer!;
};

describe('ButtonSubmit', () => {
  beforeEach(() => {
    mockUseFormikContext.mockReset();
  });

  it('disables submit when the form is not dirty', () => {
    mockUseFormikContext.mockReturnValue({
      dirty: false,
      isValid: true,
      isSubmitting: false,
      handleSubmit: jest.fn(),
    });

    const renderer = renderButton(<ButtonSubmit title="Continuar" />);
    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Continuar' });

    expect(pressable.props.disabled).toBe(true);
    expect(pressable.props.accessibilityState).toEqual({ disabled: true, busy: false });
  });

  it('disables submit while submitting', () => {
    mockUseFormikContext.mockReturnValue({
      dirty: true,
      isValid: true,
      isSubmitting: true,
      handleSubmit: jest.fn(),
    });

    const renderer = renderButton(<ButtonSubmit title="Salvar" />);
    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Salvar' });

    expect(pressable.props.disabled).toBe(true);
    expect(pressable.props.accessibilityState).toEqual({ disabled: true, busy: true });
  });

  it('invokes handleSubmit when enabled', () => {
    const handleSubmit = jest.fn();
    mockUseFormikContext.mockReturnValue({
      dirty: true,
      isValid: true,
      isSubmitting: false,
      handleSubmit,
    });

    const renderer = renderButton(<ButtonSubmit title="Entrar" />);
    const pressable = renderer.root.findByProps({ accessibilityLabel: 'Entrar' });

    ReactTestRenderer.act(() => {
      pressable.props.onPress();
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
