import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import styled from 'styled-components';
import { PaymentsTable } from './components';

const StyledCard = styled(Card)`
  .ant-card-body {
    height: 100%;
    overflow-y: scroll;
  }
`;

export const PaymentsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('ORDERS')}>
      <StyledCard className="h-full" size="small">
        <PaymentsTable />
      </StyledCard>
    </TitlePage>
  );
};
