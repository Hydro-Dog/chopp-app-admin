import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@shared/index';
import { AppDispatch, clearChatCreatingHistory, createChatAction, FETCH_STATUS, fetchUser, RootState } from '@store/index';
import { Button, Card, Typography } from 'antd';

const { Title } = Typography;

export const UserProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { createChatData, createChatStatus } = useSelector((state: RootState) => state.chat);

  const chatId = createChatData?.id;

  const createChatWithUser = useCallback(() => {
    if (id && user?.id) {
      dispatch(createChatAction({ userId: id, ownerId: user?.id }));
    }
  }, [id, user?.id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!!createChatData?.id) {
      dispatch(clearChatCreatingHistory());
      navigate(`/${ROUTES.CHATS}/${chatId}`);
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

      {/* <Button
        type="text"
        onClick={createChatWithUser}
        disabled={createChatStatus === FETCH_STATUS.LOADING}
        loading={createChatStatus === FETCH_STATUS.LOADING}
      >
        Перейти в чат c пользователем
      </Button> */}
    </Card>
  );
};
