import { useTranslation } from 'react-i18next';
import { InfoCircleOutlined, RocketOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { ACTION_MENU_ITEMS } from '../enums';

export const useGetActionItems = () => {
  const { t } = useTranslation();

  const actionItems: MenuProps['items'] = [
    {
      key: ACTION_MENU_ITEMS.INFO,
      label: t('INFO'),
      icon: <InfoCircleOutlined />,
    },
    {
      key: ACTION_MENU_ITEMS.CHANGE_ORDER_STATUS,
      label: t('CHANGE_ORDER_STATUS'),
      icon: <RocketOutlined />,
    },
  ];

  return { actionItems };
};
