import { PropsWithChildren, useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import StoreIcon from '@mui/icons-material/Store';
import { useChatsContext } from '@pages/chats/chats-context';
import { ACTIVITY_STATUS, ROUTES } from '@shared/enum';
import { useFetchChatStats } from '@shared/hooks/use-fetch-chats-stats copy';
import {
  ChatData,
  createWsMessage,
  useFilterWsMessages,
  useNotificationContext,
  useTheme,
} from '@shared/index';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { logoutUser, setLogoutStatus, wsSend } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { FETCH_STATUS } from '@store/types/fetch-status';
import { Badge, Layout, Menu, Tooltip, Typography } from 'antd';
import { SiderTheme } from 'antd/es/layout/Sider';
import { useGetCurrentRoot } from './hooks/index';

const { Sider } = Layout;
const { Text } = Typography;

export const MainMenuWidget = ({ children }: PropsWithChildren<Record<never, any>>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const { logoutStatus } = useSelector((state: RootState) => state.user);
  const { lastMessage: callHistoryStats } = useFilterWsMessages<Record<ACTIVITY_STATUS, number>>(
    WS_MESSAGE_TYPE.CALL_HISTORY_STATS,
  );
  const { lastMessage: chatsData } = useFilterWsMessages<ChatData[]>(WS_MESSAGE_TYPE.CHAT_STATS);

  const { showNotification } = useNotificationContext();

  const onMenuItemClick = (path: string) => {
    navigate(path);
  };

  const onLogout = () => {
    dispatch(logoutUser());
  };

  const { selectedMenuKeys } = useGetCurrentRoot();

  useEffect(() => {
    if (logoutStatus === FETCH_STATUS.ERROR) {
      showNotification({ type: 'error', message: 'Ошибка', description: 'Неудачный логаут' });
    } else if (logoutStatus === FETCH_STATUS.SUCCESS) {
      navigate(ROUTES.SIGN_IN);
      dispatch(setLogoutStatus(FETCH_STATUS.IDLE));
    }
  }, [dispatch, logoutStatus, navigate, showNotification]);

  useEffect(() => {
    if (wsConnected) {
      dispatch(
        wsSend(
          createWsMessage({
            type: WS_MESSAGE_TYPE.GET_CALL_HISTORY_STATS,
          }),
        ),
      );
      dispatch(
        wsSend(
          createWsMessage({
            type: WS_MESSAGE_TYPE.GET_CHAT_STATS,
          }),
        ),
      );
    }
  }, [dispatch, wsConnected]);

  useFetchChatStats();
  const { chatsStats } = useChatsContext();

  console.log('chatsStats: ', chatsStats);

  const menuItems = [
    {
      key: ROUTES.GOODS,
      icon: <StoreIcon />,
      label: t('GOODS'),
      onClick: () => onMenuItemClick(ROUTES.GOODS),
    },
    {
      key: '',
      icon: <GroupRoundedIcon />,
      label: t('USERS'),
      onClick: () => onMenuItemClick(ROUTES.ROOT),
    },
    {
      key: ROUTES.ACTIVITY,
      icon: <AssistantPhotoRoundedIcon color="primary" />,
      label: (
        <Tooltip title={JSON.stringify(callHistoryStats?.payload)}>
          <div className="flex items-center gap-1">
            <div>{t('ACTIVITY')}</div>
            <Badge size="default" count={callHistoryStats?.payload?.idle} />
          </div>
        </Tooltip>
      ),
      onClick: () => onMenuItemClick(ROUTES.ACTIVITY),
    },
    {
      key: ROUTES.CHATS,
      icon: <ChatRoundedIcon />,
      label: (
        <Tooltip title={JSON.stringify(chatsStats)}>
          <div className="flex items-center gap-1">
            <div>{t('CHATS')}</div>
            <Badge size="default" count={chatsStats.unRead} />
          </div>
        </Tooltip>
      ),
      onClick: () => onMenuItemClick(ROUTES.CHATS),
    },
    {
      key: ROUTES.SETTINGS,
      icon: <ChatRoundedIcon />,
      label: t('SETTINGS'),
      onClick: () => onMenuItemClick(ROUTES.SETTINGS),
    },
    {
      key: 'logout',
      icon: <LogoutRoundedIcon rotate={180} />,
      label: t('EXIT'),
      onClick: onLogout,
    },
  ];

  return (
    <Layout>
      <Sider
        theme={theme as SiderTheme}
        // collapsible={width > SCREEN_SIZE.SM}
        // collapsed={width > SCREEN_SIZE.SM ? collapsed : true}
        // onCollapse={(value) => setCollapsed(value)}
      >
        <div className="mt-3 flex flex-col justify-between h-screen">
          <Menu
            style={{ border: 'none' }}
            selectedKeys={selectedMenuKeys}
            mode="inline"
            items={menuItems}
          />

          <Tooltip title={t('COPYRIGHT', { ns: 'phrases' })}>
            <Text type="secondary" className="w-full text-center mb-5">
              ©2024
            </Text>
          </Tooltip>
        </div>
      </Sider>
      <Layout>{children}</Layout>
    </Layout>
  );
};
