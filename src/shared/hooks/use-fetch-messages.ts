import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@store/index';
import { fetchChatMessages } from '@store/slices';

export const useFetchMessages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const currentChatId = searchParams.get('id');

  useEffect(() => {
    if (currentChatId) {
      dispatch(fetchChatMessages(currentChatId));
    }
  }, [currentChatId]);
};
