import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { PaymentsTable } from './components';
import { PaymentsDateFilter } from './components/payments-date-filter/payments-date-filter';
import { PaymentsStatusFilter } from './components/payments-status-filter';

export const PaymentsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('ORDERS')}>
      <PaymentsDateFilter />
      <PaymentsStatusFilter />
      <PaymentsTable />
    </TitlePage>
  );
};
