import { useTranslation } from 'react-i18next';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Flex, Tooltip, Button, Typography, Input, Space } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { VerticalSkeleton } from '../vertical-skeleton';
import { CreateEditProductModal, ProductsGrid } from './components/';
import { useEffect, useState } from 'react';
import { useSuperDispatch, useSearchParamValue } from '@shared/hooks';
import { Pagination } from '@shared/types';
import { FETCH_STATUS, Product, fetchProducts } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

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
  const superDispatch = useSuperDispatch();
  const categoryId = useSearchParamValue('id');
  const { products, fetchProductsStatus } = useSelector((state: RootState) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search');
  const [search, setSearch] = useState(urlSearch);
  const [pageProducts, setPageProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Partial<Pagination>>();

  const [currentItemData, setCurrentItemData] = useState<Product>();

  useEffect(() => {
    if (categoryId !== undefined) {
      dispatch(fetchProducts({ categoryId, limit: LIMIT, pageNumber: FIRST_PAGE_NUMBER, search }));
      setPagination({
        limit: LIMIT,
        pageNumber: FIRST_PAGE_NUMBER,
      });
    }
  }, [categoryId, dispatch, search]);

  // useEffect(() => {
  //   dispatch(fetchProducts({ categoryId, limit: LIMIT, pageNumber: FIRST_PAGE_NUMBER, search }));
  //   setPagination({
  //     limit: LIMIT,
  //     pageNumber: FIRST_PAGE_NUMBER,
  //   });
  // }, [search, dispatch, categoryId]);

  useEffect(() => {
    setPageProducts(products?.items || []);
  }, [products]);

  const onLoadMore = () => {
    superDispatch({
      action: fetchProducts({
        categoryId,
        limit: pagination?.limit,
        pageNumber: pagination?.pageNumber + 1,
        search,
      }),
      thenHandler: (response) => {
        setPageProducts([...pageProducts, ...(response.items || [])]);
        setPagination({ ...pagination, pageNumber: pagination?.pageNumber + 1 });
      },
    });
  };

  const onOk = (item: Product) => {
    console.log('item: ', item, pagination?.pageNumber, products?.totalPages);
    const isLastPage = pagination?.pageNumber === products?.totalPages;
    const isIncludedInCurrentSearch = search ? item.title.includes(search) : true;

    console.log('isLastPage: ', isLastPage)
    console.log('isIncludedInCurrentSearch: ', search, isIncludedInCurrentSearch)
    if (isLastPage && isIncludedInCurrentSearch) {
      setPageProducts((prev) => [...prev, item]);
    }
    toggleCreateProductModal();
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    // Обновляем URL, устанавливая новый поисковый запрос
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchValue) {
      newSearchParams.set('search', newSearchValue);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  return (
    <>
      <VerticalSkeleton
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
          <>
            <ProductsGrid
              items={pageProducts}
              loading={fetchProductsStatus === FETCH_STATUS.LOADING}
            />

            {pagination?.pageNumber < products?.totalPages && (
              <Button onClick={onLoadMore}>{t('LOAD_MORE')}</Button>
            )}
          </>
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
