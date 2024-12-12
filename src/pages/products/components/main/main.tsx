import { useTranslation } from 'react-i18next';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Flex, Tooltip, Button, Typography } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateProductModal, ProductsGrid } from './components/';

const { Title } = Typography;

export const Main = () => {
  const { t } = useTranslation();

  const {
    value: isCreateProductModalOpen,
    setTrue: openCreateProductModal,
    toggle: toggleCreateProductModal,
  } = useBoolean();

  return (
    <div>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={20} className="ml-4">
          <StorefrontOutlinedIcon />
          <Title className="!m-0" level={4}>
            {t('GOODS')}
          </Title>
        </Flex>
        <Tooltip title={t('ADD_GOODS')}>
          <Button onClick={openCreateProductModal} type="primary">
            <AddRoundedIcon />
          </Button>
        </Tooltip>
      </Flex>
      <ProductsGrid />
      <CreateProductModal
        open={isCreateProductModalOpen}
        onCancel={toggleCreateProductModal}
        onOk={toggleCreateProductModal}
      />
    </div>
  );
};
