import type { IResult } from 'src/types/function';
import { signUpApi } from '../apis/signUpApi';

interface ISignUpPayload {
  username: string;
  fullname: string;
  password: string;
}

interface ISignUpResult {
  success: boolean;
}

export const signUp = async (payload: ISignUpPayload): Promise<IResult<ISignUpResult>> => {
  try {
    await signUpApi(payload);
    return {
      data: {
        success: true,
      },
    };
  } catch (error) {
    return {
      error: {
        code: 'SIGN_UP_ERROR',
        message: `An error occurred during sign up. - ${(error as Error).message}`,
        originError: error as Error,
      },
    };
  }
};
