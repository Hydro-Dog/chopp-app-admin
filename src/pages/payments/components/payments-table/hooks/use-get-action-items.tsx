import { useTranslation } from 'react-i18next';
import { InfoCircleOutlined, UndoOutlined } from '@ant-design/icons';
import { Payment } from '@shared/types/payment';
import { MenuProps } from 'antd';
import { ACTION_MENU_ITEMS } from '../enums';

export const useGetActionItems = () => {
  const { t } = useTranslation();

  const actionItems = (record: Payment): MenuProps['items'] => [
    {
      key: ACTION_MENU_ITEMS.INFO,
      label: t('INFO'),
      icon: <InfoCircleOutlined />,
    },
    {
      key: ACTION_MENU_ITEMS.REFUND,
      label: t('REFUND'),
      icon: <UndoOutlined />,
      disabled: !record?.refundable,
    },
  ];

  return { actionItems };
};
