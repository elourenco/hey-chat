import { signIn } from '@features/onboarding/core/signIn';
import type { IOnboardingNativeStackNavigator } from '@features/onboarding/navigation/OnboardingNavigator';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Loggers } from '@utils/loggers';
import type { FormikProps, FormikValues } from 'formik';
import { useCallback, useRef } from 'react';

const INITIAL_VALUES = {
  username: '',
  password: '',
};

export const useSignInScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<IOnboardingNativeStackNavigator>>();
  const formikRef = useRef<FormikProps<typeof INITIAL_VALUES>>(null);

  const onSubmitHandler = useCallback(async (formValues: FormikValues) => {
    try {
      const { username, password } = formValues;
      const { error } = await signIn(username, password);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      Loggers.error(error);
    }
  }, []);

  const handleGoToSignUp = useCallback(() => {
    navigate('SignUp');
  }, [navigate]);

  return {
    formikRef,
    initialValues: INITIAL_VALUES,
    onSubmitHandler,
    handleGoToSignUp,
  };
};
