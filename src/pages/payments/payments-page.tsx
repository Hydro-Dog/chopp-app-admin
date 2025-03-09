import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import { PaymentsTable } from './components';
import { PaymentsTopPanel } from './components/payments-top-panel/payments-top-panel';
export const PaymentsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('ORDERS')}>
      <Card className="h-full relative" size="small">
        <PaymentsTopPanel />
        <PaymentsTable />
      </Card>
    </TitlePage>
  );
};
