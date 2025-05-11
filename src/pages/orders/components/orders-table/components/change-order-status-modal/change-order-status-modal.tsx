import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import { ChoppOrderStatus } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { Order } from '@shared/types';
import { Dropdown, Modal, Space, Typography, Button, theme } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useGroupedOrderStatusItems } from './hooks';

const { Text } = Typography;

type Props = {
  order?: Order;
  open: boolean;
  onClose: () => void;
  onSubmit: (params: { orderStatus: ORDER_STATUS; transactionId: string }) => void;
};

/**
 * Модалка для изменения статуса заказа.
 * Позволяет выбрать новый статус из выпадающего списка и подтвердить изменения.
 */
export const ChangeOrderStatusModal = ({ order, open, onClose, onSubmit }: Props) => {
  const { t } = useTranslation();
  const items = useGroupedOrderStatusItems();
  const [selectedStatus, setSelectedStatus] = useState<ORDER_STATUS>();
  const { token: themeToken } = theme.useToken();

  const handleStatusSelect = (info: MenuInfo) => {
    setSelectedStatus(info.key as ORDER_STATUS);
  };

  const handleReset = () => {
    setSelectedStatus(undefined);
  };

  const handleSubmit = () => {
    if (!selectedStatus || !order) return;

    onSubmit({
      orderStatus: selectedStatus,
      transactionId: order.transactionId,
    });

    handleReset();
    onClose();
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title={t('CHANGE_ORDER_STATUS')}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {t('CANCEL')}
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={handleSubmit}
          disabled={!selectedStatus || selectedStatus === order?.orderStatus}>
          {t('SAVE')}
        </Button>,
      ]}>
      <Space direction="vertical" size="middle" className="w-full">
        <Text type="secondary">{t('ORDER_STATUS_CHANGE_SUMMARY')}</Text>

        <div className="grid grid-cols-2 mb-4">
          <div>
            <Text className="font-extrabold" style={{ color: themeToken.colorTextSecondary }}>
              {t('CURRENT_STATUS')}
            </Text>
            <div className="mt-2">
              {order && <ChoppOrderStatus className="text-base" status={order.orderStatus} />}
            </div>
          </div>

          <div>
            <Text className="font-extrabold" style={{ color: themeToken.colorTextSecondary }}>
              {t('NEW_STATUS')}
            </Text>
            <div className="mt-2">
              <Dropdown
                disabled={order?.orderStatus === ORDER_STATUS.DELIVERED}
                menu={{ items, onClick: handleStatusSelect }}
                trigger={['click']}>
                <Button block>
                  <Space>
                    {selectedStatus ? (
                      <ChoppOrderStatus tooltipPlacement="right" status={selectedStatus} />
                    ) : (
                      t('PICK_STATUS')
                    )}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </Space>
    </Modal>
  );
};
