import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useProductsContext } from '@pages/products/context';
import { useSuperDispatch } from '@shared/hooks';
import { PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';
import { Flex, Tooltip, Button, Input } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateEditProductModal } from '../create-edit-product-modal';
import { HeaderTitle } from './components';

const { Search } = Input;

export const ProductsLayoutHeader = () => {
  const { t } = useTranslation();

  const {
    value: isCreateProductModalOpen,
    setTrue: openCreateProductModal,
    toggle: toggleCreateProductModal,
  } = useBoolean();

  const {
    search,
    limit,
    categoryId,
    page,
    productsState,
    setPage,
    setSearch,
    setPageProducts,
    setTotalPages,
    setTotalItems,
    setLimit,
  } = useProductsContext();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Product>, unknown>();

  // Локальное состояние для ввода поиска
  const [searchValue, setSearchValue] = useState(search);
  const fetch = (val: string) => {
    if (!categoryId) {
      return console.error(`ERROR categoryId: ${categoryId}`);
    }
    setSearch(val);
    setSearchValue(val);
    superDispatch({
      action: fetchProducts({
        categoryId,
        state: productsState,
        page,
        search: val,
        limit,
      }),
      thenHandler: (response) => {
        setPageProducts(response.items);
        setPage(response.pageNumber);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
        setLimit(response.limit);
      },
    });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetch(e.target.value);
  };

  return (
    <>
      <Flex vertical>
        <Flex align="center" justify="space-between" className="m-2">
          <Flex align="center" gap={20} className="ml-4">
            <HeaderTitle />
          </Flex>
          <Tooltip title={t('ADD_PRODUCT')}>
            <Button onClick={openCreateProductModal} type="primary">
              <AddRoundedIcon />
            </Button>
          </Tooltip>
        </Flex>

        <Search
          className="px-3"
          value={searchValue}
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
