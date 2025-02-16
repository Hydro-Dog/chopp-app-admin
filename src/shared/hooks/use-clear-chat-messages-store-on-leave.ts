import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/index';
import { clearChatMessages } from '@store/slices';

export const useClearChatMessagesStoreOnLeave = () => {
  const dispatch = useDispatch<AppDispatch>();

  //Очистка стора при уходе из компонента чата
  useEffect(() => {
    return () => {
      dispatch(clearChatMessages())
    };
  }, [dispatch]);
};
