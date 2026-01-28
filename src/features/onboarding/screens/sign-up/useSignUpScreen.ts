import { signUp } from '@features/onboarding/core/signUp';
import { useNavigation } from '@react-navigation/core';
import { Loggers } from '@utils/loggers';
import type { FormikProps, FormikValues } from 'formik';
import { useCallback, useRef } from 'react';
import { useToast } from 'react-native-toast-notifications';

const INITIAL_VALUES = {
  username: '',
  fullname: '',
  password: '',
};

export const useSignUpScreen = () => {
  const toast = useToast();
  const { canGoBack, goBack } = useNavigation();
  const formikRef = useRef<FormikProps<typeof INITIAL_VALUES>>(null);

  const handleOnBack = useCallback(() => {
    if (canGoBack()) {
      formikRef.current?.resetForm();
      goBack();
    }
  }, [canGoBack, goBack]);

  const onSubmitHandler = useCallback(
    async (formValues: FormikValues) => {
      const payload = {
        username: formValues.username,
        fullname: formValues.fullname,
        password: formValues.password,
      };
      const { error } = await signUp(payload);
      if (error) {
        toast.show(error.message, { type: 'danger' });
        return;
      }

      toast.show('Sign Up Success', { type: 'success' });

      setTimeout(() => {
        handleOnBack();
      }, 1500);
    },
    [handleOnBack, toast],
  );

  return { formikRef, onSubmitHandler, handleOnBack, initialValues: INITIAL_VALUES };
};
