import { socketService } from '@app/network/socket/socketService';
import { store } from '@app/redux/store';
import { resetMessages } from '@features/chat/slices/messagesSlices';
import { removeUsers } from '@features/users/slices/usersSlices';
import * as signInApiModule from '../../apis/signInApi';
import * as signUpApiModule from '../../apis/signUpApi';
import { removeAuth, setAuth } from '../../slices/authSlices';
import { signIn } from '../signIn';
import { signOut } from '../signOut';
import { signUp } from '../signUp';

jest.mock('@app/redux/store', () => ({
  store: { dispatch: jest.fn() },
}));

jest.mock('@app/network/socket/socketService', () => ({
  socketService: { disconnect: jest.fn() },
}));

describe('onboarding core', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('signs in and stores auth data', async () => {
    const token = 'header.eyJzdWIiOiJ1c2VyLTEifQ==.signature';
    jest.spyOn(signInApiModule, 'signInApi').mockResolvedValue({
      data: { token },
    } as never);

    const result = await signIn({ username: 'user', password: 'pass' });

    expect(signInApiModule.signInApi).toHaveBeenCalledWith({ username: 'user', password: 'pass' });
    expect(store.dispatch).toHaveBeenCalledWith(
      setAuth({ token, userId: 'user-1', isAuthenticated: true }),
    );
    expect(result.data).toEqual({ token, userId: 'user-1' });
  });

  it('returns an error when sign in fails', async () => {
    jest.spyOn(signInApiModule, 'signInApi').mockRejectedValue(new Error('Boom'));

    const result = await signIn({ username: 'user', password: 'pass' });

    expect(result.error?.code).toBe('SIGN_IN_ERROR');
    expect(result.error?.message).toContain('Boom');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('signs up successfully', async () => {
    jest.spyOn(signUpApiModule, 'signUpApi').mockResolvedValue({} as never);

    const result = await signUp({ username: 'user', fullname: 'User Test', password: 'pass' });

    expect(signUpApiModule.signUpApi).toHaveBeenCalledWith({
      username: 'user',
      fullname: 'User Test',
      password: 'pass',
    });
    expect(result.data).toEqual({ success: true });
  });

  it('returns an error when sign up fails', async () => {
    jest.spyOn(signUpApiModule, 'signUpApi').mockRejectedValue(new Error('Fail'));

    const result = await signUp({ username: 'user', fullname: 'User Test', password: 'pass' });

    expect(result.error?.code).toBe('SIGN_UP_ERROR');
    expect(result.error?.message).toContain('Fail');
  });

  it('signs out and clears state', () => {
    signOut();

    expect(socketService.disconnect).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(removeAuth());
    expect(store.dispatch).toHaveBeenCalledWith(removeUsers());
    expect(store.dispatch).toHaveBeenCalledWith(resetMessages());
  });
});
