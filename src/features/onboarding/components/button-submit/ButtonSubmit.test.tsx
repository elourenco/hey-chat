import Button from '@components/button/Button';
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
    const button = renderer.root.findByType(Button);

    expect(button.props.disabled).toBe(true);
    expect(button.props.loading).toBe(false);
  });

  it('disables submit while submitting', () => {
    mockUseFormikContext.mockReturnValue({
      dirty: true,
      isValid: true,
      isSubmitting: true,
      handleSubmit: jest.fn(),
    });

    const renderer = renderButton(<ButtonSubmit title="Salvar" />);
    const button = renderer.root.findByType(Button);

    expect(button.props.disabled).toBe(true);
    expect(button.props.loading).toBe(true);
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
    const button = renderer.root.findByType(Button);

    ReactTestRenderer.act(() => {
      button.props.onPress();
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
