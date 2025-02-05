import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useSuperDispatch, useSearchParamValue } from '@shared/hooks';
import { FETCH_STATUS, PaginationQuery, PaginationResponse, Product, PaginationRequestQuery } from '@shared/index';
import { fetchProducts } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { Flex, Tooltip, Button, Typography, Input } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { VerticalGrid } from '../vertical-grid';
import { CreateEditProductModal, ProductsGrid } from './components/';

const { Title } = Typography;
const { Search } = Input;

const LIMIT = 2;
const FIRST_PAGE_NUMBER = 1;

export const Main = () => {
  const { t } = useTranslation();

  const {
    value: isCreateProductModalOpen,
    setTrue: openCreateProductModal,
    toggle: toggleCreateProductModal,
  } = useBoolean();

  const dispatch = useDispatch<AppDispatch>();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Product>, any>();
  const categoryId = useSearchParamValue('id') || '';
  const { products, fetchProductsStatus } = useSelector((state: RootState) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(urlSearch);
  const [pageProducts, setPageProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pick<PaginationRequestQuery, 'page' | 'limit'>>({
    page: FIRST_PAGE_NUMBER,
    limit: LIMIT,
  });

  useEffect(() => {
    console.log('setPageProducts: ', products?.items);
    setPageProducts(products?.items || []);
  }, [products]);

  useEffect(() => {
    if (categoryId !== undefined) {
      dispatch(fetchProducts({ categoryId, limit: LIMIT, page: FIRST_PAGE_NUMBER, search }));
      //Сбросить пагинацию при переключении категории
      setPagination({
        page: FIRST_PAGE_NUMBER,
        limit: LIMIT,
      });
    }
  }, [categoryId, dispatch, search]);

  const onLoadMore = () => {
    superDispatch({
      action: fetchProducts({
        categoryId,
        limit: pagination?.limit,
        page: pagination.page || 0 + 1,
        search,
      }),
      thenHandler: (response) => {
        setPageProducts([...pageProducts, ...(response.items || [])]);
        setPagination({ ...pagination, page: response.currentPage + 1 });
      },
    });
  };

  const onOk = (item: Product) => {
    const isLastPage =
      pagination?.page === products?.totalPages || products?.totalPages === 0;
    const isIncludedInCurrentSearch = search ? item.title.includes(search) : true;

    if (isLastPage && isIncludedInCurrentSearch) {
      setPageProducts((prev) => [...prev, item]);
    }
    toggleCreateProductModal();
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    updateUrlWithSearchValue(newSearchValue);
  };

  // Обновляем URL, устанавливая новый поисковый запрос
  const updateUrlWithSearchValue = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set('search', value);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  console.log('pagination: ', pagination);
  console.log('products?.totalPages: ', products?.totalPages);

  return (
    <>
      <VerticalGrid
        titleNode={
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
        }
        mainNode={
          products?.totalPages !== undefined && (
            <>
              <ProductsGrid
                items={pageProducts}
                loading={fetchProductsStatus === FETCH_STATUS.LOADING}
              />

              {(pagination?.page || 1) < products?.totalPages && (
                <Button onClick={onLoadMore}>{t('LOAD_MORE')}</Button>
              )}
            </>
          )
        }
      />

      <CreateEditProductModal
        open={isCreateProductModalOpen}
        onCancel={toggleCreateProductModal}
        onOk={onOk}
      />
    </>
  );
};
