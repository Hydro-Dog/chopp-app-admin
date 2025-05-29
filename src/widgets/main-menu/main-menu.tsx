import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { ROUTES, STORAGE_KEYS } from '@shared/enum';
import { useMuteSwitcher } from '@shared/hooks/use-mute-switcher';
import { useNotificationContext, useTheme, useThemeSwitcher } from '@shared/index';
import { FETCH_STATUS } from '@shared/index';
import { logout, setLogoutStatus } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { Flex, Layout, Menu } from 'antd';
import { SiderTheme } from 'antd/es/layout/Sider';
import Link from 'antd/es/typography/Link';
import { useGetMenuItemByUrl } from './hooks/index';

const { Sider } = Layout;

export const MainMenuWidget = ({ children }: PropsWithChildren<Record<never, any>>) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { logoutStatus } = useSelector((state: RootState) => state.user);
  const { selectedMenuKeys } = useGetMenuItemByUrl();
  const { showNotification } = useNotificationContext();

  const onLogout = () => {
    dispatch(logout({ refreshToken: String(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)) }));
  };

  useEffect(() => {
    if (logoutStatus === FETCH_STATUS.ERROR) {
      showNotification({ type: 'error', message: 'Ошибка', description: 'Неудачный логаут' });
    } else if (logoutStatus === FETCH_STATUS.SUCCESS) {
      navigate(ROUTES.SIGN_IN);
      dispatch(setLogoutStatus(FETCH_STATUS.IDLE));
    }
  }, [dispatch, logoutStatus, navigate, showNotification]);

  const menuItems = [
    {
      key: ROUTES.PRODUCTS,
      icon: selectedMenuKeys.includes(ROUTES.PRODUCTS) ? <ShopFilled /> : <ShopOutlined />,
      label: <Link href={`/${ROUTES.PRODUCTS}`}>{t('PRODUCTS')}</Link>,
    },
    {
      key: '',
      icon: selectedMenuKeys.includes('') ? <BellFilled /> : <BellOutlined />,
      label: <Link href="/">{t('ORDERS')}</Link>,
    },
    {
      key: ROUTES.PAYMENTS,
      icon: selectedMenuKeys.includes(ROUTES.PAYMENTS) ? <BankFilled /> : <BankOutlined />,
      label: <Link href={`/${ROUTES.PAYMENTS}`}>{t('PAYMENTS')}</Link>,
    },
    {
      key: ROUTES.SETTINGS,
      icon: selectedMenuKeys.includes(ROUTES.SETTINGS) ? <SlidersFilled /> : <SlidersOutlined />,
      label: <Link href={`/${ROUTES.SETTINGS}`}>{t('SETTINGS')}</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutRoundedIcon />,
      label: t('EXIT'),
      onClick: onLogout,
    },
  ];

  const { themeSwitcher } = useThemeSwitcher();
  const { muteSwitcher } = useMuteSwitcher();

  return (
    <Layout>
      <Sider theme={theme as SiderTheme}>
        <Flex vertical justify="space-between" className="h-full">
          <Menu className="pt-3" selectedKeys={selectedMenuKeys} mode="inline" items={menuItems} />
          <Flex align='center' gap={8} className="mb-4 ml-4">
            {themeSwitcher} {muteSwitcher}
          </Flex>
        </Flex>
      </Sider>
      <Layout>{children}</Layout>
    </Layout>
  );
};
