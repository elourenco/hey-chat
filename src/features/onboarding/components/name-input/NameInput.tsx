import TextInput from '@components/text-input/TextInput';
import { useField } from 'formik';
import { memo } from 'react';

const MAX_LENGTH = 255;

const NameInput = (props: React.ComponentProps<typeof TextInput>) => {
  const [field, , helpers] = useField('fullname');

  return (
    <TextInput
      autoCapitalize="none"
      autoComplete="name"
      autoCorrect={false}
      keyboardType="default"
      returnKeyType="next"
      placeholder="Digita o seu nome"
      maxLength={MAX_LENGTH}
      value={field.value as string}
      onChangeText={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      {...props}
    />
  );
};

export default memo(NameInput);
