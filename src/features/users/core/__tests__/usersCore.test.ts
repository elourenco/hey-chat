import { store } from '@app/redux/store';
import type { IUser } from '@entities/user';
import * as getUsersApiModule from '../../apis/getUsersApi';
import { setIsOnline, setUsers } from '../../slices/usersSlices';
import { loadUserList } from '../loadUserList';
import { updateStatusIsOnline } from '../updateStatusIsOnline';

jest.mock('@app/redux/store', () => ({
  store: { dispatch: jest.fn() },
}));

describe('users core', () => {
  const users: IUser[] = [
    {
      id: '1',
      username: 'ana',
      fullname: 'Ana User',
      isOnline: true,
    },
  ];
  const getUsersApiSpy = jest.spyOn(getUsersApiModule, 'getUsersApi');

  beforeEach(() => {
    jest.clearAllMocks();
    getUsersApiSpy.mockResolvedValue({ data: users } as never);
  });

  it('loads users from payload without api call', async () => {
    const result = await loadUserList({ payload: users });

    expect(getUsersApiSpy).not.toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(setUsers(users));
    expect(result.data).toEqual(users);
  });

  it('loads users from api when payload is missing', async () => {
    const result = await loadUserList();

    expect(getUsersApiSpy).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setUsers(users));
    expect(result.data).toEqual(users);
  });

  it('returns an error when load users fails', async () => {
    getUsersApiSpy.mockRejectedValue(new Error('Down'));

    const result = await loadUserList();

    expect(result.error?.code).toBe('LOAD_USER_LIST_ERROR');
    expect(result.error?.message).toContain('Down');
  });

  it('dispatches online status update', () => {
    updateStatusIsOnline({ userId: '1', isOnline: false });

    expect(store.dispatch).toHaveBeenCalledWith(setIsOnline({ id: '1', online: false }));
  });
});
