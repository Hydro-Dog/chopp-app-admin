import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useChatsContext } from '@pages/chats/chats-context';
import { Card, Spin, Typography } from 'antd';
import { FETCH_STATUS } from '@shared/types';
import { useThemeToken } from '@shared/hooks';
import { useDispatch } from 'react-redux';
import { setOpenedChat, fetchChats, AppDispatch } from '@store/index';
import { useTranslation } from 'react-i18next';
const { Title, Text } = Typography;

export const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { chats, fetchChatsStatus, openedChat } = useChatsContext();
  const themeToken = useThemeToken();
  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();

  const openedChatId = searchParams.get('id');

  const handleChatClick = (id: string) => {
    dispatch(setOpenedChat(id));
    setSearchParams({ id });
  };

  useEffect(() => {
    dispatch(fetchChats()).unwrap()
    .then(() => {
      if (openedChatId) {
        dispatch(setOpenedChat(openedChatId));
      }
      if (openedChat) {
        setSearchParams({ id: openedChat });
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-1 p-1">
      {fetchChatsStatus === FETCH_STATUS.LOADING && (
        <div className="flex flex-col items-center mt-5">
          <Spin size="default" />
        </div>
      )}
      {chats?.map((item) => (
        <Card
          size="small"
          className="cursor-pointer"
          // TODO: item.id сейчас указан как стринг, но с бэка приходит number, нужно заменить на бэке, чтобы приходил uuid string
          style={{ minHeight: 70, backgroundColor: Number(openedChat) === Number(item.id) ? themeToken.colorPrimaryBg : themeToken.colorBgContainer }}
          key={item.id}
          onClick={() => handleChatClick(item.id)}>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <Title className="!m-0" level={5}>
                {item.fullName}
              </Title>
              {/* {!item?.lastMessage?.wasReadBy?.includes(currentUser?.id) && (
                    <Badge className="mt-1.5" dot />
                  )} */}
            </div>

            {item?.lastMessage?.createdAt && (
              <Text>{new Date(item?.lastMessage?.createdAt).toLocaleTimeString()}</Text>
            )}
          </div>
          <div className="truncate overflow-hidden whitespace-nowrap">
            {item?.lastMessage ? item?.lastMessage.text : t('CHATS_CONTEXT.EMPTY_LAST_MESSAGE')}
          </div>
        </Card>
      ))}
    </div>
  );
};
