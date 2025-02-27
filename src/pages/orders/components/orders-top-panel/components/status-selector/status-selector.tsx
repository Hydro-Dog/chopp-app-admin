import { useTranslation } from 'react-i18next';
import { useOrdersContext } from '@pages/orders/context';
import { ChoppOrderStatus } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { Select, SelectProps, Tag } from 'antd';
import { useChangeTableOrders } from '../../../../hooks';

export const StatusSelector = () => {
  const { t } = useTranslation();
  const { ordersStatus, setOrdersStatus, search } = useOrdersContext();
  const filters = useChangeTableOrders();

  const all = 'all';

  const items = [
    {
      value: all,
      label: <Tag color="black">{t('ORDERS_PAGE.CHOOSE_ALL')}</Tag>,
    },
    ...Object.values(ORDER_STATUS).map((status) => ({
      value: status,
      label: <ChoppOrderStatus status={status} />,
    })),
  ];

  const changeRangeStatus = (value: ORDER_STATUS[]) => {
    if (value.includes(all as ORDER_STATUS)) {
      setOrdersStatus(Object.values(ORDER_STATUS));
      filters({ searchParam: search, orderStatusParam: value });
    } else {
      setOrdersStatus(value as ORDER_STATUS[]);
      filters({ orderStatusParam: value });
    }
  };

  const sharedProps: SelectProps = {
    mode: 'multiple',
    maxTagCount: 'responsive',
  };

  return (
    <>
      <div className="flex items-center">
        <Select
          {...sharedProps}
          prefix={t('ORDERS_PAGE.CHOSEN_STATUS')}
          defaultValue={items.map((item) => item.value) as ORDER_STATUS[]}
          value={ordersStatus}
          className="w-full"
          onChange={changeRangeStatus}
          options={items}
          showSearch={false}
        />
      </div>
    </>
  );
};
