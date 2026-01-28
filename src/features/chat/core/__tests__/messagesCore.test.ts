import { socketService } from '@app/network/socket/socketService';
import { store } from '@app/redux/store';
import type { IMessage } from '@entities/message';
import * as getMessagesByUserApiModule from '../../apis/getMessagesByUserApi';
import * as sendMessageApiModule from '../../apis/sendMessageApi';
import { setMessages } from '../../slices/messagesSlices';
import { loadMessagesByUser } from '../loadMessagesByUser';
import { sendMessage } from '../sendMessage';

jest.mock('@app/redux/store', () => ({
  store: { dispatch: jest.fn() },
}));

jest.mock('@app/network/socket/socketService', () => ({
  socketService: {
    isConnected: jest.fn(),
    sendMessage: jest.fn(),
  },
}));

describe('chat core', () => {
  const message: IMessage = {
    id: '1',
    from: 'user-1',
    to: 'user-2',
    body: 'Ola',
    updatedAt: new Date('2024-01-01T10:00:00Z'),
  };
  const sendMessageApiSpy = jest.spyOn(sendMessageApiModule, 'sendMessageApi');
  const getMessagesByUserApiSpy = jest.spyOn(getMessagesByUserApiModule, 'getMessagesByUserApi');

  beforeEach(() => {
    jest.clearAllMocks();
    sendMessageApiSpy.mockResolvedValue({ data: message } as never);
    getMessagesByUserApiSpy.mockResolvedValue({ data: [message] } as never);
  });

  it('sends via socket when connected', async () => {
    (socketService.isConnected as jest.Mock).mockReturnValue(true);

    const result = await sendMessage({ from: 'user-1', to: 'user-2', body: 'Ola' });

    expect(socketService.sendMessage).toHaveBeenCalledWith({
      from: 'user-1',
      to: 'user-2',
      body: 'Ola',
    });
    expect(sendMessageApiSpy).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it('sends via api when socket is disconnected', async () => {
    (socketService.isConnected as jest.Mock).mockReturnValue(false);

    const result = await sendMessage({ from: 'user-1', to: 'user-2', body: 'Ola' });

    expect(sendMessageApiSpy).toHaveBeenCalledWith({
      from: 'user-1',
      to: 'user-2',
      body: 'Ola',
    });
    expect(store.dispatch).toHaveBeenCalledWith(setMessages(message));
    expect(result.data).toEqual(message);
  });

  it('returns an error when send fails', async () => {
    (socketService.isConnected as jest.Mock).mockReturnValue(false);
    sendMessageApiSpy.mockRejectedValue(new Error('Network'));

    const result = await sendMessage({ from: 'user-1', to: 'user-2', body: 'Ola' });

    expect(result.error?.code).toBe('SEND_MESSAGE_ERROR');
    expect(result.error?.message).toContain('Network');
  });

  it('loads messages from payload without api call', async () => {
    const payload = [message];

    const result = await loadMessagesByUser({ userId: 'user-2', payload });

    expect(getMessagesByUserApiSpy).not.toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(setMessages(payload));
    expect(result.data).toEqual(payload);
  });

  it('loads messages from api when payload is missing', async () => {
    const result = await loadMessagesByUser({ userId: 'user-2' });

    expect(getMessagesByUserApiSpy).toHaveBeenCalledWith('user-2');
    expect(store.dispatch).toHaveBeenCalledWith(setMessages([message]));
    expect(result.data).toEqual([message]);
  });

  it('returns an error when load messages fails', async () => {
    getMessagesByUserApiSpy.mockRejectedValue(new Error('Timeout'));

    const result = await loadMessagesByUser({ userId: 'user-2' });

    expect(result.error?.code).toBe('LOAD_MESSAGES_ERROR');
    expect(result.error?.message).toContain('Timeout');
  });
});
