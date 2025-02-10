import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useProductsContext } from '@pages/products/context';
import { Product } from '@shared/index';
import { RootState } from '@store/store';
import { Flex, Tooltip, Button, Typography, Input } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateEditProductModal } from '../create-edit-product-modal';

const { Title } = Typography;
const { Search } = Input;

export const HeaderGridSegment = () => {
  const { t } = useTranslation();
  const { products } = useSelector((state: RootState) => state.products);
  const { search, searchParams, pagination, setSearchParams, setSearch, setPageProducts } =
    useProductsContext();
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

  const onOk = (item: Product) => {
    console.log('item: ', item)
    const isLastPage = pagination?.page === products?.totalPages || products?.totalPages === 0;
    const isIncludedInCurrentSearch = search ? item.title.includes(search) : true;

    if (isLastPage && isIncludedInCurrentSearch) {
      setPageProducts((prev) => [...prev, item]);
    }
    toggleCreateProductModal();
  };

  return (
    <>
      <Flex vertical>
        <Flex align="center" justify="space-between" className="mr-2 mt-1">
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

        <Search value={search} placeholder={t('SEARCH')} onChange={onSearchChange} allowClear />
      </Flex>

      <CreateEditProductModal
        open={isCreateProductModalOpen}
        onCancel={toggleCreateProductModal}
        onOk={onOk}
      />
    </>
  );
};
