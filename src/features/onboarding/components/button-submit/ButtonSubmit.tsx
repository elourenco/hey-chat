import Button from '@components/button/Button';
import { useFormikContext } from 'formik';
import { memo, useMemo } from 'react';

interface IButtonSubmitProps {
  title: string;
}

const ButtonSubmit = ({ title }: IButtonSubmitProps) => {
  const { dirty, isValid, isSubmitting, handleSubmit } = useFormikContext();

  const disabled = useMemo(() => {
    return !dirty || !isValid || isSubmitting;
  }, [dirty, isValid, isSubmitting]);

  return (
    <Button
      title={title}
      onPress={() => handleSubmit()}
      disabled={disabled}
      loading={isSubmitting}
    />
  );
};

export default memo(ButtonSubmit);
