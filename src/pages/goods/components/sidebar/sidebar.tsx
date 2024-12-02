import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { ChopDraggableList } from '@shared/components';
import { useNotificationContext, useSearchParam } from '@shared/index';
import {
  fetchCategories,
  Category,
  updateCategories,
  deleteCategory,
} from '@store/slices/goods-slice';
import { AppDispatch, RootState } from '@store/store';
import { FETCH_STATUS } from '@store/types';
import { Spin, Flex, Tooltip, Button, Typography } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateCategoryModal } from './components';
import { DeleteCategoryModal } from './components/delete-category-modal';
import { ListItem } from './components/list-item';

const { Title } = Typography;

export const Sidebar = () => {
  const flexRef = useRef<HTMLElement>(null);
  const urlCategoryId = useSearchParam('id');
  const [, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const { showErrorNotification } = useNotificationContext();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, fetchCategoriesStatus, updateCategoriesStatus, updateCategoryTitleStatus } =
    useSelector((state: RootState) => state.goods);

  const {
    value: isCreateCategoryModalOpen,
    setTrue: openCreateCategoryModal,
    setFalse: closeCreateCategoryModal,
  } = useBoolean();

  const {
    value: isDeleteCategoryModalOpen,
    setTrue: openDeleteCategoryModal,
    setFalse: closeDeleteCategoryModal,
  } = useBoolean();

  const [categoryToDelete, setCategoryToDelete] = useState<Category>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onCategoriesOrderChange = (newCategories: Category[]) => {
    dispatch(updateCategories(newCategories));
  };

  const onDeleteCategoryModalOpen = (id: string) => {
    setCategoryToDelete(categories?.find((item) => item.id == id));
    openDeleteCategoryModal();
  };

  const onCloseDeleteCategory = () => {
    closeDeleteCategoryModal();
    setCategoryToDelete(undefined);
  };

  const onDeleteCategory = () => {
    dispatch(deleteCategory(categoryToDelete!.id))
      .unwrap()
      .catch((error) => showErrorNotification({ message: t('ERROR'), description: error.message }));
    onCloseDeleteCategory();
  };

  const onClickItem = (id: string) => {
    setSearchParams({ id });
  };

  return (
    <>
      {fetchCategoriesStatus === FETCH_STATUS.LOADING ? (
        <Spin size="large" />
      ) : (
        <>
          <Flex ref={flexRef} align="center" justify="space-between" className="mr-2 mt-1">
            <Flex align="center" gap={20}>
              <FormatListBulletedRoundedIcon />
              <Title className="!m-0 whitespace-nowrap" level={4}>
                {t('CATEGORIES')}
              </Title>
            </Flex>
            <Tooltip title={t('ADD_CATEGORY')}>
              <Button
                disabled={updateCategoriesStatus === FETCH_STATUS.LOADING}
                loading={updateCategoriesStatus === FETCH_STATUS.LOADING}
                onClick={openCreateCategoryModal}
                type="primary">
                <AddRoundedIcon />
              </Button>
            </Tooltip>
          </Flex>
          <div
            style={{
              overflow: 'scroll',
              // 24px - это два паддинга card-body размера small
              height: `calc(100% - 24px - ${flexRef.current?.offsetHeight || 0}px)`,
              marginTop: '12px',
              marginRight: '12px',
            }}>
            <ChopDraggableList
              unchangeableItems={['Без категории']}
              items={categories || []}
              onDragEnd={onCategoriesOrderChange}
              onDeleteItem={onDeleteCategoryModalOpen}
              onClickItem={onClickItem}
              initialCategoryId={urlCategoryId}
              ListItem={ListItem}
            />
          </div>
        </>
      )}
      <CreateCategoryModal open={isCreateCategoryModalOpen} onClose={closeCreateCategoryModal} />
      <DeleteCategoryModal
        category={categoryToDelete}
        open={isDeleteCategoryModalOpen}
        onOk={onDeleteCategory}
        onCancel={onCloseDeleteCategory}
      />
    </>
  );
};
