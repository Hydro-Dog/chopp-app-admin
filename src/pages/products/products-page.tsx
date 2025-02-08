import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import { Splitter } from 'antd';
import { Main, Sidebar } from './components';
import { ProductsProvider } from './context';

export const ProductsPage = () => {
  const { t } = useTranslation();

  return (
    <ProductsProvider>
      <TitlePage title={t('GOODS')}>
        <Card className="h-full" size="small">
          <Splitter
            style={{
              position: 'absolute',
              height: `calc(100% - 24px)`,
              width: `calc(100% - 48px)`,
            }}>
            <Splitter.Panel defaultSize="25%" min="25%" max="40%">
              <Sidebar />
            </Splitter.Panel>
            <Splitter.Panel>
              <Main />
            </Splitter.Panel>
          </Splitter>
        </Card>
      </TitlePage>
    </ProductsProvider>
  );
};
