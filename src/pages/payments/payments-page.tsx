import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import styled from 'styled-components';
import { PaymentsTable } from './components';
import { PaymentsDateFilter } from './components/payments-date-filter/payments-date-filter';
import { PaymentsStatusFilter } from './components/payments-status-filter';
import { PaymentsProvider } from './context';

const StyledCard = styled(Card)`
  .ant-card-body {
    height: 100%;
    overflow-y: scroll;
  }
`;

export const PaymentsPage = () => {
  const { t } = useTranslation();

  return (
    <PaymentsProvider>
      <TitlePage title={t('ORDERS')}>
        <StyledCard className="h-full" size="small">
          <PaymentsDateFilter />
          <PaymentsStatusFilter />
          <PaymentsTable />
        </StyledCard>
      </TitlePage>
    </PaymentsProvider>
  );
};
