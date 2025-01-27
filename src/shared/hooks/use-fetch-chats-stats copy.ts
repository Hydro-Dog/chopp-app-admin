import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useChatsContext } from '@pages/chats/chats-context';
import { AppDispatch, fetchChatStats, RootState } from '@store/index';

export const useFetchChatStats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { chatsStats } = useSelector((state: RootState) => state.chatsRepository);
  // const { setChatsStats } = useChatsContext();

  

  useEffect(() => {
    dispatch(fetchChatStats());
  }, [currentUser]);

  useEffect(() => {
    if (chatsStats) {
      setChatsStats(chatsStats);
    }
  }, [chatsStats]);
};
