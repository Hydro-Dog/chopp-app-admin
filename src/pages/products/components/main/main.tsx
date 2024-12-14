import { useTranslation } from 'react-i18next';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Flex, Tooltip, Button, Typography } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { VerticalSkeleton } from '../vertical-skeleton';
import { CreateEditProductModal, ProductsGrid } from './components/';

const { Title } = Typography;

export const Main = () => {
  const { t } = useTranslation();

  const {
    value: isCreateProductModalOpen,
    setTrue: openCreateProductModal,
    toggle: toggleCreateProductModal,
  } = useBoolean();

  return (
    <>
      <VerticalSkeleton
        titleNode={
          <>
            <Flex align="center" gap={20} className="ml-4">
              <StorefrontOutlinedIcon />
              <Title className="!m-0" level={4}>
                {t('GOODS')}
              </Title>
            </Flex>
            <Tooltip title={t('ADD_PRODUCT')}>
              <Button onClick={openCreateProductModal} type="primary">
                <AddRoundedIcon />
              </Button>
            </Tooltip>
          </>
        }
        mainNode={<ProductsGrid />}
      />

      <CreateEditProductModal
        open={isCreateProductModalOpen}
        onCancel={toggleCreateProductModal}
        onOk={toggleCreateProductModal}
      />
    </>
  );
};
