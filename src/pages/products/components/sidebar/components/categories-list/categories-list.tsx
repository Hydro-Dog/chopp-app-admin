import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ChopDraggableList } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import { useSearchParamValue } from '@shared/hooks';
import {
  Category,
  fetchCategories,
  updateCategories,
  deleteCategory,
} from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { useBoolean } from 'usehooks-ts';
import { DeleteCategoryModal } from '../delete-category-modal';
import { Spin } from 'antd';
import { ListItem } from '../list-item';
import { FETCH_STATUS } from '@shared/index';

export const CategoriesList = () => {
  const urlCategoryId = useSearchParamValue('id');
  const [, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const urlChatId = useSearchParamValue('id');

  const { showErrorNotification } = useNotificationContext();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, fetchCategoriesStatus } = useSelector(
    (state: RootState) => state.productCategory,
  );

  const {
    value: isDeleteCategoryModalOpen,
    setTrue: openDeleteCategoryModal,
    setFalse: closeDeleteCategoryModal,
  } = useBoolean();

  const [categoryToDelete, setCategoryToDelete] = useState<Category>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (!urlChatId && categories) {
      setSearchParams({
        id:
          categories.find((item) => item.order === 1)?.id ||
          categories.find((item) => item.order === 0)?.id ||
          '',
      });
    }
  }, [categories, setSearchParams, urlChatId]);

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

  if (fetchCategoriesStatus === FETCH_STATUS.LOADING) {
    return <Spin size="large" />;
  }

  return (
    <>
      <ChopDraggableList
        unchangeableItems={['Без категории']}
        items={categories || []}
        onDragEnd={onCategoriesOrderChange}
        onDeleteItem={onDeleteCategoryModalOpen}
        onClickItem={onClickItem}
        initialCategoryId={urlCategoryId}
        ListItem={ListItem}
      />
      <DeleteCategoryModal
        category={categoryToDelete}
        open={isDeleteCategoryModalOpen}
        onOk={onDeleteCategory}
        onCancel={onCloseDeleteCategory}
      />
    </>
  );
};
