import { useTranslation } from 'react-i18next';
import { TitlePage, useSearchParamValue } from '@shared/index';
import { Card } from 'antd';
import { Splitter } from 'antd';
import { Main, Sidebar } from './components';

export const ProductsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('GOODS')}>
      <Card className="h-full" size="small">
        <Splitter
          style={{
            position: 'absolute',
            // 48px - это два паддинга стандартного card-body
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
  );
};
