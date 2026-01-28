import { store } from '@app/redux/store';
import type { IResult } from 'src/types/function';
import { signInApi } from '../apis/signInApi';
import { setAuth } from '../screens/slices/authSlices';

interface SignInResult {
  token: string;
}

interface SignInPayload {
  username: string;
  password: string;
}

export const signIn = async (payload: SignInPayload): Promise<IResult<SignInResult>> => {
  try {
    const response = await signInApi(payload);
    store.dispatch(setAuth({ token: response.data.token, isAuthenticated: true }));
    return {
      data: {
        token: response.data.token,
      },
    };
  } catch (error) {
    return {
      error: {
        code: 'SIGN_IN_ERROR',
        message: `An error occurred during sign in. - ${(error as Error).message}`,
        originError: error as Error,
      },
    };
  }
};
