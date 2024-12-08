import { useTranslation } from 'react-i18next';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useSearchParam } from '@shared/index';
import { Flex, Tooltip, Button, Typography } from 'antd';
import { CreateProductModal } from './components/';
import { useBoolean } from 'usehooks-ts';

const { Title } = Typography;

export const Main = () => {
  const urlCategoryId = useSearchParam('id');
  const { t } = useTranslation();

  const {
    value: isCreateProductModalOpen,
    setTrue: openCreateProductModal,
    setFalse: closeCreateProductModal,
  } = useBoolean();

  const onOk = () => {
    closeCreateProductModal();
  };

  const onCancel = () => {
    closeCreateProductModal();
  };

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
          <Button
            // disabled={createProductStatus === FETCH_STATUS.LOADING}
            // loading={createProductStatus === FETCH_STATUS.LOADING}
            onClick={openCreateProductModal}
            type="primary">
            <AddRoundedIcon />
          </Button>
        </Tooltip>
      </Flex>
      urlCategoryId: {urlCategoryId}
      <CreateProductModal open={isCreateProductModalOpen} onCancel={onCancel} onOk={onOk} />
    </div>
  );
};
