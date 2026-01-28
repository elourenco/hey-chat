import Button from '@components/button/Button';
import Screen from '@components/screen/Screen';
import Text from '@components/text/Text';
import VStack from '@components/v-stack/VStack';
import ButtonSubmit from '@features/onboarding/components/button-submit/ButtonSubmit';
import NameInput from '@features/onboarding/components/name-input/NameInput';
import PasswordInput from '@features/onboarding/components/password-input/PasswordInput';
import UserNameInput from '@features/onboarding/components/user-name-input/UserNameInput';
import { signUpSchema } from '@features/onboarding/schemas/signUpSchema';
import { Formik } from 'formik';
import { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { useSignUpScreen } from './useSignUpScreen';

const SignUpScreen = () => {
  const { formikRef, initialValues, onSubmitHandler, handleOnBack } = useSignUpScreen();

  return (
    <Screen>
      <Screen>
        <VStack
          spacing={8}
          full
          justify="center"
          entering={ZoomIn.delay(200).duration(500).damping(15)}
        >
          <VStack
            spacing={16}
            justify="center"
            entering={FadeInDown.delay(500).duration(600).damping(15)}
          >
            <Text type="bold">Faça o cadastro</Text>
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              validationSchema={signUpSchema}
              validateOnBlur
              onSubmit={onSubmitHandler}
            >
              <VStack spacing={8}>
                <NameInput />
                <UserNameInput />
                <PasswordInput />
                <ButtonSubmit title="Cadastrar" />
              </VStack>
            </Formik>
            <Button title="Cancelar" onPress={handleOnBack} variant="link" />
          </VStack>
        </VStack>
      </Screen>
    </Screen>
  );
};

export default SignUpScreen;
