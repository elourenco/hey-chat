import { Colors } from '@app/theme/colors';
import Text from '@components/text/Text';
import { forwardRef, type Ref, useCallback, useState } from 'react';
import {
  type BlurEvent,
  type FocusEvent,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { styles } from './styles';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  labelStyle?: TextStyle;
  customContainerStyle?: ViewStyle;
  customLabelContainerStyle?: ViewStyle;
  customInputContainerStyle?: ViewStyle;
  customInputStyle?: object;
  customErrorStyle?: TextStyle;
  value?: string;
  errorMessage?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

const BaseTextInput = (
  {
    value,
    label,
    placeholder,
    labelStyle,
    customContainerStyle,
    customLabelContainerStyle,
    customInputContainerStyle,
    customInputStyle,
    customErrorStyle,
    errorMessage,
    onChangeText,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    ...props
  }: TextInputProps,
  ref: Ref<RNTextInput>,
) => {
  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = useCallback(
    (e: FocusEvent) => {
      setFocused(true);
      onFocusProp?.(e);
    },
    [onFocusProp],
  );

  const handleBlur = useCallback(
    (e: BlurEvent) => {
      setFocused(false);
      onBlurProp?.(e);
    },
    [onBlurProp],
  );

  const handleChange = useCallback(
    (text: string) => {
      onChangeText?.(text);
    },
    [onChangeText],
  );

  return (
    <>
      <View style={[styles.container, customContainerStyle]}>
        {label ? (
          <View style={[styles.labelContainer, customLabelContainerStyle]}>
            <Text type="medium" color="gray5" style={[labelStyle]}>
              {label}
            </Text>
          </View>
        ) : null}
      </View>
      <View
        style={[
          styles.inputContainer,
          focused ? styles.inputFocused : styles.inputWithoutFocused,
          customInputContainerStyle,
        ]}
      >
        <RNTextInput
          ref={ref}
          underlineColorAndroid="transparent"
          textAlignVertical="center"
          allowFontScaling={false}
          style={[styles.input, customInputStyle]}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray5}
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChange}
        />
      </View>
      {errorMessage ? (
        <View style={[styles.textErrorContent]}>
          <Text color="error" style={[customErrorStyle]}>
            {errorMessage}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default forwardRef(BaseTextInput);
