import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import { useChatsContext } from '@pages/chats/chats-context';
import { ROUTES } from '@shared/enum';
import { useFetchChatStats } from '@shared/hooks/use-fetch-chats-stats copy';
import { useNotificationContext, useTheme } from '@shared/index';
import { FETCH_STATUS } from '@shared/index';
import { logoutUser, setLogoutStatus } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { Badge, Layout, Menu, Tooltip } from 'antd';
import { SiderTheme } from 'antd/es/layout/Sider';
import { useGetMenuItemByUrl } from './hooks/index';
import {
  BankFilled,
  BankOutlined,
  BellFilled,
  BellOutlined,
  ShopFilled,
  ShopOutlined,
  SlidersFilled,
  SlidersOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export const MainMenuWidget = ({ children }: PropsWithChildren<Record<never, any>>) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { logoutStatus } = useSelector((state: RootState) => state.user);
  const { selectedMenuKeys } = useGetMenuItemByUrl();
  const { chatsStats } = useChatsContext();
  const { showNotification } = useNotificationContext();

  const onMenuItemClick = (path: string) => {
    navigate(path);
  };

  const onLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (logoutStatus === FETCH_STATUS.ERROR) {
      showNotification({ type: 'error', message: 'Ошибка', description: 'Неудачный логаут' });
    } else if (logoutStatus === FETCH_STATUS.SUCCESS) {
      navigate(ROUTES.SIGN_IN);
      dispatch(setLogoutStatus(FETCH_STATUS.IDLE));
    }
  }, [dispatch, logoutStatus, navigate, showNotification]);

  useFetchChatStats();

  const menuItems = [
    {
      key: ROUTES.PRODUCTS,
      icon: selectedMenuKeys.includes(ROUTES.PRODUCTS) ? <ShopFilled /> : <ShopOutlined />,
      label: t('PRODUCTS'),
      onClick: () => onMenuItemClick(ROUTES.PRODUCTS),
    },
    // {
    //   key: '',
    //   //TODO: сделать иконки по аналогии с первым элементом
    //   icon: <GroupRoundedIcon />,
    //   label: t('USERS'),
    //   onClick: () => onMenuItemClick(ROUTES.ROOT),
    // },
    {
      key: '',
      icon: selectedMenuKeys.includes('') ? <BellFilled /> : <BellOutlined />,
      label: (
        <div className="flex items-center gap-1">
          <div>{t('ORDERS')}</div>
        </div>
      ),
      onClick: () => onMenuItemClick(''),
    },
    {
      key: ROUTES.PAYMENTS,
      icon: selectedMenuKeys.includes(ROUTES.PAYMENTS) ? <BankFilled /> : <BankOutlined />,
      label: (
        <div className="flex items-center gap-1">
          <div>{t('PAYMENTS')}</div>
        </div>
      ),
      onClick: () => onMenuItemClick(ROUTES.PAYMENTS),
    },
    // {
    //   key: ROUTES.CHATS,
    //   icon: <ChatRoundedIcon />,
    //   label: (
    //     <Tooltip title={JSON.stringify(chatsStats)}>
    //       <div className="flex items-center gap-1">
    //         <div>{t('CHATS')}</div>
    //         <Badge size="default" count={0} />
    //       </div>
    //     </Tooltip>
    //   ),
    //   onClick: () => onMenuItemClick(ROUTES.CHATS),
    // },
    {
      key: ROUTES.SETTINGS,
      icon: selectedMenuKeys.includes(ROUTES.SETTINGS) ? <SlidersFilled /> : <SlidersOutlined />,
      label: t('SETTINGS'),
      onClick: () => onMenuItemClick(ROUTES.SETTINGS),
    },
    {
      key: ROUTES.ANALYTICS,
      icon: <AnalyticsIcon />,
      label: t('ANALYTICS'),
      onClick: () => onMenuItemClick(ROUTES.ANALYTICS),
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
      <Sider theme={theme as SiderTheme}>
        <Menu className="pt-3" selectedKeys={selectedMenuKeys} mode="inline" items={menuItems} />
      </Sider>
      <Layout>{children}</Layout>
    </Layout>
  );
};
