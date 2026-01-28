import { signIn } from '@features/onboarding/core/signIn';
import type { IOnboardingNativeStackNavigator } from '@features/onboarding/navigation/OnboardingNavigator';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Loggers } from '@utils/loggers';
import type { FormikProps, FormikValues } from 'formik';
import { useCallback, useRef } from 'react';
import { useToast } from 'react-native-toast-notifications';

const INITIAL_VALUES = {
  username: '',
  password: '',
};

export const useSignInScreen = () => {
  const toast = useToast();
  const { navigate } = useNavigation<NativeStackNavigationProp<IOnboardingNativeStackNavigator>>();
  const formikRef = useRef<FormikProps<typeof INITIAL_VALUES>>(null);

  const onSubmitHandler = useCallback(
    async (formValues: FormikValues) => {
      const { username, password } = formValues;
      const { error } = await signIn({ username, password });

      if (error) {
        toast.show('Failed to sign in. Please try again.', { type: 'danger' });
        return;
      }
    },
    [toast],
  );

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
