import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Средняя стоимость доставки',
    children: '123123123',
  },
  {
    key: '2',
    label: 'Бесплатная доставка',
    children: 'Включена',
  },
  {
    key: '3',
    label: 'Цена',
    children: '333333',
  },
];

export const PriceSettingsEditBody: React.FC = () => {
  return (
    <div>
      <Descriptions column={1} size={'default'} items={items} />
    </div>
  );
};
