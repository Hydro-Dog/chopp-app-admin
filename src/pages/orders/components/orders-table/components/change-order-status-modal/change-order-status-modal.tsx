import { DownOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { ChoppOrderStatus } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { Order } from '@shared/types';
import { Dropdown, MenuProps, Modal, Space, Typography } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const items: MenuProps['items'] = Object.values(ORDER_STATUS).map((status) => ({
  key: status,
  label: <ChoppOrderStatus status={status} />,
}));

type Props = {
  order?: Order;
  open: boolean;
  onClose: () => void;
  onSubmit: ({
    orderStatus,
    transactionId,
  }: {
    orderStatus: ORDER_STATUS;
    transactionId: string;
  }) => void;
};

export const ChangeOrderStatusModal = ({ order, open, onClose, onSubmit }: Props) => {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState<ORDER_STATUS>();

  const onNewStatusSelected = (value: MenuInfo) => {
    setSelectedStatus(value.key as ORDER_STATUS);
  };

  const resetModal = () => {
    setSelectedStatus(undefined);
  };

  const onOk = () => {
    resetModal();
    onSubmit({ orderStatus: selectedStatus!, transactionId: order!.transactionId });
    onClose();
  };

  const onCancel = () => {
    resetModal();
    onClose();
  };

  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel} title={t('CHANGE_ORDER_STATUS')}>
      <Space direction="vertical">
        {order?.orderStatus && (
          <Space align="center">
            <Text>{t('CURRENT_STATUS')}</Text>
            <ChoppOrderStatus status={order!.orderStatus!} />
          </Space>
        )}

        <ArrowDownOutlined />

        <Space align="center">
          <Text>{t('NEW_STATUS')}</Text>
          <Dropdown
            menu={{
              items,
              onClick: onNewStatusSelected,
            }}>
            <Space>
              {selectedStatus ? <ChoppOrderStatus status={selectedStatus} /> : t('PICK_STATUS')}
              {/* {selectedStatus || t('PICK_STATUS')} */}
              <DownOutlined />
            </Space>
          </Dropdown>
        </Space>
      </Space>
    </Modal>
  );
};
