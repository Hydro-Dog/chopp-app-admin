import { BellOutlined, RocketOutlined } from '@ant-design/icons';
import { ChoppAnimatedIcon, Order, useWsNotification } from '@shared/index';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { message, Space } from 'antd';
import { useEffect } from 'react';

export const RootContainer = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { lastMessage: newOrderNotification } = useWsNotification<Order>(WS_MESSAGE_TYPE.NEW_ORDER);

  // TODO: вынести нотификации в отдельный компонент
  // TODO: сделать обработку разных видов нотификаций

  useEffect(() => {
    if (newOrderNotification) {
      messageApi.open({
        type: 'success',
        content: (
          <Space>
            {`Новый заказ № ${newOrderNotification.payload?.id}`}

            <ChoppAnimatedIcon animation="bounce" icon={<BellOutlined />} />
          </Space>
        ),
      });
    }
  }, [messageApi, newOrderNotification]);

  // useEffect(() => {
  //   if (localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)) {
  //     fetchShoppingCartDispatch({ action: fetchShoppingCart() });
  //     fetchClientAppConfigCartDispatch({ action: fetchClientAppConfig() });
  //     dispatch(fetchCurrentUser());
  //   }
  // }, []);

  return (
    <div>
      {/* TODO: вынести нотификации в отдельный компонент */}
      {contextHolder}
    </div>
  );
};
