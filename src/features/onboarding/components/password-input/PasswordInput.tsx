import TextInput from '@components/text-input/TextInput';
import { useField } from 'formik';
import { memo } from 'react';

const MAX_LENGTH = 255;

const PasswordInput = (props: React.ComponentProps<typeof TextInput>) => {
  const [field, meta, helpers] = useField('password');
  return (
    <TextInput
      secureTextEntry
      autoCapitalize="none"
      autoComplete="current-password"
      autoCorrect={false}
      keyboardType="default"
      returnKeyType="done"
      placeholder="Senha"
      maxLength={MAX_LENGTH}
      errorMessage={meta.touched && meta.error ? meta.error : undefined}
      value={field.value as string}
      onChangeText={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      {...props}
    />
  );
};

export default memo(PasswordInput);
