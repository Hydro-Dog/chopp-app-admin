import { useTranslation } from 'react-i18next';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const sharedProps: SelectProps['options'] = [];

export const AnalyticsProductsFilter = () => {
  const { t } = useTranslation();

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  return (
    <Space direction="vertical" size={12}>
      <Select
        placeholder={t('ENTER_PRODUCT_ID')}
        mode="multiple"
        className="w-2/6"
        allowClear
        onChange={handleChange}
      />
    </Space>
  );
};
