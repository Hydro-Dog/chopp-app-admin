import { useTranslation } from 'react-i18next';
import { Tooltip, Tag, Dropdown, Space } from 'antd';
import { InfoCircleOutlined, UndoOutlined, DownOutlined } from '@ant-design/icons';
import { PAYMENT_STATUS_MAP, PAYMENT_STATUS } from '@shared/index';
import { Payment } from '@shared/types/payment';
import { MenuProps } from 'antd';

type Args = {
  onActionClick: (key: string, record: Payment) => void;
};

export const useGetPaymentsTableColumns = ({ onActionClick }: Args) => {
  const { t } = useTranslation();

  const getActionsMenu = (record: Payment): MenuProps['items'] => [
    {
      key: 'details',
      label: t('INFO'),
      icon: <InfoCircleOutlined />,
    },
    {
      key: 'refund',
      label: t('REFUND'),
      icon: <UndoOutlined />,
      disabled: !record?.refundable,
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('PAYMENT_STATUS_TITLE'),
      dataIndex: 'status',
      key: 'status',
      render: (status: PAYMENT_STATUS) => (
        <Tooltip title={t(PAYMENT_STATUS_MAP[status].tooltip)}>
          <Tag color={PAYMENT_STATUS_MAP[status].color}>{t(PAYMENT_STATUS_MAP[status].title)}</Tag>
        </Tooltip>
      ),
    },
    {
      title: t('AMOUNT'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount?: { value: string; currency: string }) =>
        amount
          ? Number(amount.value)?.toLocaleString('ru-RU', {
              style: 'currency',
              currency: amount.currency || 'RUB',
            })
          : '—',
    },
    {
      title: t('ACTIONS'),
      key: 'actions',
      render: (_: any, record: Payment) => (
        <Dropdown
          menu={{
            items: getActionsMenu(record),
            onClick: (e) => onActionClick(e.key, record),
          }}>
          <Space>
            {t('ACTIONS')}
            <DownOutlined />
          </Space>
        </Dropdown>
      ),
    },
  ];

  return { columns };
};
