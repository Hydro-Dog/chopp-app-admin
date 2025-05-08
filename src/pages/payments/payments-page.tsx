import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import { Main } from './components';
export const PaymentsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('PAYMENTS')}>
      <Card className="payments-page-card h-full" size="small">
        <Main />
      </Card>
    </TitlePage>
  );
};
