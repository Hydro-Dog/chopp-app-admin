import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TitlePage } from '@shared/index';
import { RootState } from '@store/index';
import { fetchOrders } from '@store/slices';
import { OrdersTable } from './components';
import { Card } from 'antd';

export const OrdersPage = () => {
  const { t } = useTranslation();
  const { orders } = useSelector((state: RootState) => state.orders);

  return (
    <TitlePage title={t('ORDERS')}>
      <Card className="h-full" size="small">
        <OrdersTable fetchData={fetchOrders} data={orders} />
      </Card>
    </TitlePage>
  );
};
