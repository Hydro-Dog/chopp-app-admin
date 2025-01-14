import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useChatsContext } from '@pages/chats/chats-context';
import { Card, Badge, Typography } from 'antd';
import { useMarkChatAsRead } from './hooks';
import { useNewIncomingMessagePreviewHandler } from './hooks/use-new-incoming-message-preview-handler';
const { Title, Text } = Typography;

export const Sidebar = () => {
  const [_, setSearchParams] = useSearchParams();
  const { chats, fetchChats } = useChatsContext();

  useEffect(() => {
    fetchChats();
  }, []);

  // useMarkChatAsRead();
  // useNewIncomingMessagePreviewHandler();

  return (
    <div className="flex flex-col gap-1 p-1">
      {chats?.map(
        (item) =>
            <Card
              size="small"
              className="cursor-pointer"
              style={{ minHeight: 70 }}
              key={item.id}
              onClick={() => setSearchParams({ id: item.id })}>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <Title className="!m-0" level={5}>
                    {item.fullName}
                  </Title>
                  {/* {!item?.lastMessage?.wasReadBy?.includes(currentUser?.id) && (
                    <Badge className="mt-1.5" dot />
                  )} */}
                </div>

                {item?.lastMessage?.createdAt && (<Text>{new Date(item?.lastMessage?.createdAt).toLocaleTimeString()}</Text>)}
              </div>
              <div className="truncate overflow-hidden whitespace-nowrap">
                {item?.lastMessage ? item?.lastMessage.text : 'Нет сообщений'}
              </div>
            </Card>
      )}
    </div>
  );
};
