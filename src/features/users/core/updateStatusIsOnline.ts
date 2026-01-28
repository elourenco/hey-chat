import { store } from '@app/redux/store';
import { setIsOnline } from '../slices/usersSlices';

interface UpdateStatusIsOnlineParams {
  userId: string;
  isOnline: boolean;
}

export const updateStatusIsOnline = ({ userId, isOnline }: UpdateStatusIsOnlineParams) => {
  store.dispatch(setIsOnline({ id: userId, online: isOnline }));
};
