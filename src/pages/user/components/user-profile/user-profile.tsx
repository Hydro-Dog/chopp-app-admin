import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { ROUTES, FETCH_STATUS } from '@shared/index';
import { AppDispatch, clearChatCreatingHistory, createChatAction, fetchUser, RootState } from '@store/index';
import { Button, Card, Typography } from 'antd';

const { Title } = Typography;

export const UserProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, currentUser } = useSelector((state: RootState) => state.user);
  const { createdChat, createChatStatus } = useSelector((state: RootState) => state.chatsRepository);

  const chatId = createdChat?.id;

  const createChatWithUser = useCallback(() => {
    console.log('currentUser', currentUser);
    if (id && currentUser?.id) {
      dispatch(createChatAction({ userId: id, ownerId: currentUser?.id }));
    }
  }, [id, currentUser?.id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!!createdChat?.id) {
      dispatch(clearChatCreatingHistory());
      const path = {
        pathname: `/${ROUTES.CHATS}`,
        search: createSearchParams({ id: `${chatId}` }).toString()
      };
      navigate(path);
    }
  }, [chatId]);

  return (
    <Card size="small">
      <Title className="!mb-2" level={3}>
        {user?.fullName}
      </Title>

      {/* TODO: использовать компонет AntD Descriptions */}
      <p>
        {t('EMAIL')}: {user?.email}
      </p>
      <p>
        {t('PHONE_NUMBER')}: {user?.phoneNumber}
      </p>

      {currentUser?.id !== user?.id && (
        <Button
          type="text"
          onClick={createChatWithUser}
          disabled={createChatStatus === FETCH_STATUS.LOADING}
          loading={createChatStatus === FETCH_STATUS.LOADING}
        >
          Перейти в чат c пользователем
        </Button>
      )}
    </Card>
  );
};
