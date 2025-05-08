import { VerticalLayout } from '@shared/components/vertical-layout';
import { PaymentsTopPanel } from '..';
import { PaymentsTable } from '..';

export const Main = () => {
  return <VerticalLayout header={<PaymentsTopPanel />} main={<PaymentsTable />} />;
};
