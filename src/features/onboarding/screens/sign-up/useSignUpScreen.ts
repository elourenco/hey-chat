import { signUp } from '@features/onboarding/core/signUp';
import { useNavigation } from '@react-navigation/core';
import { Loggers } from '@utils/loggers';
import type { FormikProps, FormikValues } from 'formik';
import { useCallback, useRef } from 'react';

const INITIAL_VALUES = {
  username: '',
  fullname: '',
  password: '',
};

export const useSignUpScreen = () => {
  const { canGoBack, goBack } = useNavigation();
  const formikRef = useRef<FormikProps<typeof INITIAL_VALUES>>(null);

  const handleOnBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  const onSubmitHandler = useCallback(
    async (formValues: FormikValues) => {
      try {
        const payload = {
          username: formValues.username,
          fullname: formValues.fullname,
          password: formValues.password,
        };
        const { error } = await signUp(payload);
        if (error) {
          throw new Error(error.message);
        }
        handleOnBack();
      } catch (error) {
        Loggers.error(error);
      }
    },
    [handleOnBack],
  );

  return { formikRef, onSubmitHandler, handleOnBack, initialValues: INITIAL_VALUES };
};
