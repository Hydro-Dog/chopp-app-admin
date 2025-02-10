import { useTranslation } from 'react-i18next';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useProductsContext } from '@pages/products/context';
import { Flex, Tooltip, Button, Typography, Input } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateEditProductModal } from '../create-edit-product-modal';

const { Title } = Typography;
const { Search } = Input;

export const HeaderGridSegment = () => {
  const { t } = useTranslation();
  const { search, searchParams, setSearchParams, setSearch } = useProductsContext();
  const {
    value: isCreateProductModalOpen,
    setTrue: openCreateProductModal,
    toggle: toggleCreateProductModal,
  } = useBoolean();

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    updateUrlWithSearchValue(newSearchValue);
  };

  const updateUrlWithSearchValue = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set('search', value);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  return (
    <>
      <Flex vertical>
        <Flex align="center" justify="space-between" className="m-2">
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
        </Flex>

        <Search
          className="px-3"
          value={search}
          placeholder={t('SEARCH')}
          onChange={onSearchChange}
          allowClear
        />
      </Flex>

      <CreateEditProductModal
        open={isCreateProductModalOpen}
        onCancel={toggleCreateProductModal}
        onOk={toggleCreateProductModal}
      />
    </>
  );
};
