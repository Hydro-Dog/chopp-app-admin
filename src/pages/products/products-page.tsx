import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import { Splitter } from 'antd';
import { Main, Sidebar } from './components';

export const ProductsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('PRODUCTS')}>
      <Card className="h-full" size="small">
        <Splitter
          style={{
            position: 'absolute',
            height: `calc(100% - 24px)`,
            width: `calc(100% - 24px)`,
          }}>
          <Splitter.Panel defaultSize="20%" min="20%" max="30%">
            <Sidebar />
          </Splitter.Panel>
          <Splitter.Panel>
            <Main />
          </Splitter.Panel>
        </Splitter>
      </Card>
    </TitlePage>
  );
};
