import { store } from '@app/redux/store';
import type { IUser } from '@entities/user';
import type { IResult } from 'src/types/function';
import { getUsersApi } from '../apis/getUsersApi';
import { setUsers } from '../slices/usersSlices';

interface LoadUserListParams {
  payload?: IUser[];
}

const resolveUsers = async (payload?: IUser[]): Promise<IUser[]> => {
  if (Array.isArray(payload)) {
    return payload;
  }
  const response = await getUsersApi();
  return response.data;
};

export const loadUserList = async ({
  payload,
}: LoadUserListParams = {}): Promise<IResult<IUser[]>> => {
  try {
    const users = await resolveUsers(payload);
    store.dispatch(setUsers(users));
    return {
      data: users,
    };
  } catch (error) {
    return {
      error: {
        code: 'LOAD_USER_LIST_ERROR',
        message: `Failed to load user list. - ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        originError: error instanceof Error ? error : undefined,
      },
    };
  }
};
