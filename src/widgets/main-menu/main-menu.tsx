import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { CALL_STATUS, ROUTES } from '@shared/enum';
import { SCREEN_SIZE } from '@shared/enum/screen-size';
import {
  createWsMessage,
  useFilterWsMessages,
  useNotificationContext,
  useTheme,
} from '@shared/index';
import { logoutUser, setLogoutStatus, wsSend } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { FETCH_STATUS } from '@store/types/fetch-status';
import { Badge, Layout, Menu, Tooltip, Typography } from 'antd';
import { SiderTheme } from 'antd/es/layout/Sider';
import { useWindowSize } from 'usehooks-ts';
import { useGetCurrentRoot } from './hooks';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';

const { Sider } = Layout;
const { Text } = Typography;

export const MainMenuWidget = ({ children }: PropsWithChildren<Record<never, any>>) => {
  // const { width } = useWindowSize();
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [collapsed, setCollapsed] = useState(width < SCREEN_SIZE.MD);
  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const { logoutStatus } = useSelector((state: RootState) => state.user);
  const { lastMessage: callHistoryStats } = useFilterWsMessages<Record<CALL_STATUS, number>>(
    WS_MESSAGE_TYPE.CALL_HISTORY_STATS,
  );

  const { openNotification } = useNotificationContext();

  const onMenuItemClick = (path: string) => {
    navigate(path);
  };

  const onLogout = () => {
    dispatch(logoutUser());
  };

  const { selectedMenuKeys } = useGetCurrentRoot();

  useEffect(() => {
    if (logoutStatus === FETCH_STATUS.ERROR) {
      openNotification({ type: 'error', message: 'Ошибка', description: 'Неудачный логаут' });
    } else if (logoutStatus === FETCH_STATUS.SUCCESS) {
      navigate(ROUTES.SIGN_IN);
      dispatch(setLogoutStatus(FETCH_STATUS.IDLE));
    }
  }, [dispatch, logoutStatus, navigate, openNotification]);

  useEffect(() => {
    if (wsConnected) {
      dispatch(
        wsSend(
          createWsMessage({
            type: WS_MESSAGE_TYPE.GET_CALL_HISTORY_STATS,
          }),
        ),
      );
    }
  }, [dispatch, wsConnected]);

  const menuItems = [
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
          <Badge offset={[12, 0]} size="default" count={callHistoryStats?.payload?.idle}>
            <div>{t('ACTIVITY')}</div>
          </Badge>
        </Tooltip>
      ),
      onClick: () => onMenuItemClick(ROUTES.ACTIVITY),
    },
    {
      key: ROUTES.CHATS,
      icon: <ChatRoundedIcon />,
      label: t('CHATS'),
      onClick: () => onMenuItemClick(ROUTES.CHATS),
    },
    {
      key: 'logout',
      icon: <LogoutRoundedIcon rotate={180} />,
      label: t('EXIT'),
      onClick: onLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme={theme as SiderTheme}
        // collapsible={width > SCREEN_SIZE.SM}
        // collapsed={width > SCREEN_SIZE.SM ? collapsed : true}
        // onCollapse={(value) => setCollapsed(value)}
      >
        <div className="mt-3 flex flex-col justify-between h-full">
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
