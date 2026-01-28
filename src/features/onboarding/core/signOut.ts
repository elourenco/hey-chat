import { socketService } from '@app/network/socket/socketService';
import { store } from '@app/redux/store';
import { resetMessages } from '@features/chat/slices/messagesSlices';
import { removeUsers } from '@features/users/slices/usersSlices';
import { removeAuth } from '../slices/authSlices';

export const signOut = () => {
  socketService.disconnect();
  store.dispatch(removeAuth());
  store.dispatch(removeUsers());
  store.dispatch(resetMessages());
};
