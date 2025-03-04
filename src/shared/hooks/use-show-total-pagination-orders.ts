import { useTranslation } from 'react-i18next';
import { PaginationProps } from 'antd';

export const useShowTotalPaginationOrders = (): PaginationProps['showTotal'] => {
  const { t } = useTranslation();
  return (total) => `${t('TOTAL_PAGINATION_ITEMS_ORDER')}: ${total}`;
};
