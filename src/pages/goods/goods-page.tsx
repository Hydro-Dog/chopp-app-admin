import { useTranslation } from 'react-i18next';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { TitlePage } from '@shared/index';
import { Button, Card, Flex, Tooltip, Typography } from 'antd';
import { Splitter } from 'antd';
import { Sidebar } from './components';

const { Title } = Typography;

export const GoodsPage = () => {
  const { t } = useTranslation();

  return (
    <>
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
              <>
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={20} className="ml-4">
                    <StorefrontOutlinedIcon />
                    <Title className="!m-0" level={4}>
                      {t('GOODS')}
                    </Title>
                  </Flex>
                  <Tooltip title={t('ADD_GOODS')}>
                    <Button
                      // disabled={createProductStatus === FETCH_STATUS.LOADING}
                      // loading={createProductStatus === FETCH_STATUS.LOADING}
                      // onClick={openCreateProduct}
                      type="primary">
                      <AddRoundedIcon />
                    </Button>
                  </Tooltip>
                </Flex>
                content
              </>
            </Splitter.Panel>
          </Splitter>
        </Card>
      </TitlePage>
    </>
  );
};
