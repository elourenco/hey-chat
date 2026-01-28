import Button from '@components/button/Button';
import Screen from '@components/screen/Screen';
import Text from '@components/text/Text';
import VStack from '@components/v-stack/VStack';
import ButtonSubmit from '@features/onboarding/components/button-submit/ButtonSubmit';
import PasswordInput from '@features/onboarding/components/password-input/PasswordInput';
import UserNameInput from '@features/onboarding/components/user-name-input/UserNameInput';
import { signInSchema } from '@features/onboarding/schemas/signInSchema';
import { Formik } from 'formik';
import { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { useSignInScreen } from './useSignInScreen';

const SignInScreen = () => {
  const { formikRef, initialValues, onSubmitHandler, handleGoToSignUp } = useSignInScreen();
  return (
    <Screen>
      <VStack
        spacing={8}
        full
        justify="center"
        entering={ZoomIn.delay(200).duration(500).damping(15)}
      >
        <Text type="bold" size="3xl">
          Hey
        </Text>
        <VStack
          spacing={16}
          justify="center"
          entering={FadeInDown.delay(1000).duration(600).damping(15)}
        >
          <Text type="bold">Faça o login</Text>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={signInSchema}
            validateOnBlur
            onSubmit={onSubmitHandler}
          >
            <VStack spacing={8}>
              <UserNameInput />
              <PasswordInput />
              <ButtonSubmit title="Continue" />
            </VStack>
          </Formik>
          <Button variant="link" title="Criar conta" onPress={handleGoToSignUp} />
        </VStack>
      </VStack>
    </Screen>
  );
};

export default SignInScreen;
