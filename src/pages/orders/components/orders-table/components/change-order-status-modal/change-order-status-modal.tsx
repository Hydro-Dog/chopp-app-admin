import {
  DownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CarOutlined,
  DeliveredProcedureOutlined,
  ShoppingOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { ChoppOrderStatus } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { Order } from '@shared/types';
import { ORDER_STATUS_MAP } from '@shared/index';
import { Dropdown, MenuProps, Modal, Space, Typography, Button, theme } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGroupedOrderStatusItems } from './hooks';

const { Text } = Typography;

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
  const items = useGroupedOrderStatusItems()
  const [selectedStatus, setSelectedStatus] = useState<ORDER_STATUS>();
  const { token: themeToken } = theme.useToken();

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
    <Modal
      open={open}
      onCancel={onCancel}
      title={t('CHANGE_ORDER_STATUS')}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t('CANCEL')}
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={onOk}
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
              <ChoppOrderStatus
                className="text-base"
                status={order?.orderStatus!}
              />
            </div>
          </div>

          <div>
            <Text className="font-extrabold" style={{ color: themeToken.colorTextSecondary }}>
              {t('NEW_STATUS')}
            </Text>
            <div className="mt-2">
              <Dropdown
                menu={{
                  items,
                  onClick: onNewStatusSelected,
                }}
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
