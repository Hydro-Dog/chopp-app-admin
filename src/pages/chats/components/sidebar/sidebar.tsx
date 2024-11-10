import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useChatsContext } from '@pages/chats/chats-context';
import { AppDispatch, fetchChatData, RootState } from '@store/index';
import { Card, Badge, Typography } from 'antd';
import { useMarkChatAsRead } from './hooks';
import { useNewIncomingMessagePreviewHandler } from './hooks/use-new-incoming-message-preview-handler';
const { Title, Text } = Typography;

export const Sidebar = () => {
  const [_, setSearchParams] = useSearchParams();
  const { chatsData } = useSelector((state: RootState) => state.chat);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { chats, setChats } = useChatsContext();

  useEffect(() => {
    dispatch(fetchChatData());
  }, [dispatch]);

  useEffect(() => {
    setChats(chatsData);
  }, [chatsData]);

  useMarkChatAsRead({ setChats, chats });
  useNewIncomingMessagePreviewHandler({ setChats });

  return (
    <div className="flex flex-col gap-1">
      {chats?.map(
        (item) =>
          item?.lastMessage && (
            <Card
              size="small"
              className="cursor-pointer"
              key={item.userId}
              onClick={() => setSearchParams({ id: item.chatId })}>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <Title className="!m-0" level={5}>
                    {item.fullName}
                  </Title>
                  {!item?.lastMessage?.wasReadBy?.includes(currentUser?.id) && (
                    <Badge className="mt-1.5" dot />
                  )}
                </div>

                <Text>{new Date(item.lastMessage.timeStamp).toLocaleTimeString()}</Text>
              </div>
              <div className="truncate overflow-hidden whitespace-nowrap">
                {item.lastMessage.text}
              </div>
            </Card>
          ),
      )}
    </div>
  );
};
