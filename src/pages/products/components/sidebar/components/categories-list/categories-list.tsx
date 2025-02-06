import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ChopDraggableList } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import { useSearchParamValue, useSuperDispatch } from '@shared/hooks';
import { Category, FETCH_STATUS } from '@shared/index';
import { fetchCategories, updateCategories, deleteCategory } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { Spin } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { DeleteCategoryModal } from '../delete-category-modal';
import { ListItem } from '../list-item';

export const CategoriesList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { superDispatch } = useSuperDispatch<Category[], string>();
  const urlChatId = useSearchParamValue('id');
  const { categories, fetchCategoriesStatus } = useSelector((state: RootState) => state.productCategory);
  const {
    value: isDeleteCategoryModalOpen,
    setTrue: openDeleteCategoryModal,
    setFalse: closeDeleteCategoryModal,
  } = useBoolean();
  const [, setSearchParams] = useSearchParams();
  const [categoryToDelete, setCategoryToDelete] = useState<Category>();
  const { showErrorNotification } = useNotificationContext();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (!urlChatId && categories) {
      setSearchParams({
        id: categories.find((item) => item.order === 1)?.id || categories.find((item) => item.order === 0)?.id || '',
      });
    }
  }, [categories, setSearchParams, urlChatId]);

  const onCategoriesOrderChange = (newCategories: Category[]) => {
    dispatch(updateCategories(newCategories));
  };

  const onDeleteCategoryModalOpen = (id: string) => {
    setCategoryToDelete(categories?.find((item) => item.id === id));
    openDeleteCategoryModal();
  };

  const onCloseDeleteCategory = () => {
    closeDeleteCategoryModal();
    setCategoryToDelete(undefined);
  };

  const onDeleteCategory = () => {
    superDispatch({
      action: deleteCategory(categoryToDelete!.id),
      thenHandler: () => {
        setSearchParams({
          id: categories?.[0].id || 'noCategoriesError',
        });
      },
      catchHandler: (error) => showErrorNotification({ message: t('ERROR'), description: error.message }),
    });
    onCloseDeleteCategory();
  };

  const onClickItem = (id: string) => {
    setSearchParams({ id });
  };

  if (fetchCategoriesStatus === FETCH_STATUS.LOADING) {
    return <Spin size="small" />;
  }

  return (
    <>
      <ChopDraggableList
        unchangeableItems={['Без категории']}
        items={categories || []}
        onDragEnd={onCategoriesOrderChange}
        onDeleteItem={onDeleteCategoryModalOpen}
        onClickItem={onClickItem}
        initialCategoryId={urlChatId}
        // @ts-ignore
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
