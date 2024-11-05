import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useFilterWsMessages } from '@shared/hooks';
import { ChatsData } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { createWsMessage } from '@shared/utils';
import { AppDispatch, RootState } from '@store/index';
import { wsSend } from '@store/slices';
import { Card, Badge, Typography } from 'antd';
const { Title, Text } = Typography;

export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { lastMessage: chatsData } = useFilterWsMessages<ChatsData[]>(WS_MESSAGE_TYPE.CHAT_STATS);
  const { wsConnected } = useSelector((state: RootState) => state.ws);

//   useEffect(() => {
//     if (wsConnected) {
//       dispatch(
//         wsSend(
//           createWsMessage({
//             type: WS_MESSAGE_TYPE.GET_CHAT_MESSAGES_HISTORY,
//             message: searchParams.get('id') || '',
//           }),
//         ),
//       );
//     }
//   }, [searchParams]);

  return (
    <div className="flex flex-col gap-1">
      {chatsData?.payload?.map((item) => (
        <Card
          size="small"
          className="cursor-pointer"
          key={item.userId}
          onClick={() => setSearchParams({ id: item.userId })}>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <Title className="!m-0" level={5}>
                {item.userName}
              </Title>
              {item.hasUnreadMessages && <Badge className="mt-1.5" dot />}
            </div>

            <Text>{new Date(item.lastMessage.timeStamp).toLocaleTimeString()}</Text>
          </div>
          <div className="truncate overflow-hidden whitespace-nowrap">
            {item.lastMessage.message}
          </div>
        </Card>
      ))}
    </div>
  );
};
