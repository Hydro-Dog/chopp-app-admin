import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import { Main } from './components';
import { Splitter } from 'antd';
export const PaymentsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('PAYMENTS')}>
      <Card className="h-full" size="small">
        <Splitter
          style={{
            position: 'absolute',
            height: `calc(100% - 24px)`,
            width: `calc(100% - 24px)`,
          }}>
          <Splitter.Panel>
            <Main />
          </Splitter.Panel>
        </Splitter>
      </Card>
    </TitlePage>
  );
};
