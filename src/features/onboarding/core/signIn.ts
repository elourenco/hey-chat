import { store } from '@app/redux/store';
import type { IResult } from 'src/types/function';
import { decodeJwtPayload } from '@utils/jwt';
import { signInApi } from '../apis/signInApi';
import { setAuth } from '../slices/authSlices';

interface SignInResult {
  token: string;
  userId?: string;
}

interface SignInPayload {
  username: string;
  password: string;
}

export const signIn = async (payload: SignInPayload): Promise<IResult<SignInResult>> => {
  try {
    const response = await signInApi(payload);
    const token = response.data.token;
    const userId = decodeJwtPayload(token)?.sub;
    store.dispatch(setAuth({ token, userId, isAuthenticated: true }));
    return {
      data: {
        token,
        userId,
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
