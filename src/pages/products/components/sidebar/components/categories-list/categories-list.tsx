import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useProductsContext } from '@pages/products/context';
import { ChopDraggableList } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import { useSuperDispatch } from '@shared/hooks';
import { Category, FETCH_STATUS, PRODUCT_STATE } from '@shared/index';
import { fetchCategories, updateCategories, deleteCategory } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { Spin } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { DeleteCategoryModal } from '../delete-category-modal';
import { ListItem } from '../list-item';

export const CategoriesList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { categoryId, setCategoryId, setSearch, setPage, setProductsState } = useProductsContext();
  const { categories, fetchCategoriesStatus } = useSelector(
    (state: RootState) => state.productCategory,
  );
  const {
    value: isDeleteCategoryModalOpen,
    setTrue: openDeleteCategoryModal,
    setFalse: closeDeleteCategoryModal,
  } = useBoolean();
  const [categoryToDelete, setCategoryToDelete] = useState<Category>();
  const { showErrorNotification } = useNotificationContext();
  const { superDispatch } = useSuperDispatch<Category[], unknown>();

  useEffect(() => {
    superDispatch({
      action: fetchCategories(),
      thenHandler: (categories) => {
        if (!categoryId) {
          setCategoryId(
            categories.find((item) => item.order === 1)?.id ||
              categories.find((item) => item.order === 0)?.id ||
              '',
          );
        }
      },
    });
  }, []);

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
        setCategoryId(categories?.[0].id || 'noCategoriesError');
      },
      catchHandler: (error) =>
        showErrorNotification({ message: t('ERROR'), description: error.message }),
    });
    onCloseDeleteCategory();
  };

  const onClickItem = (id: string) => {
    setProductsState(PRODUCT_STATE.DEFAULT);
    setCategoryId(id);
    setSearch('');
    setPage(1);
  };

  if (fetchCategoriesStatus === FETCH_STATUS.LOADING) {
    return <Spin size="small" />;
  }

  return (
    <div className="mr-2">
      <ChopDraggableList
        unchangeableItems={['Другое']}
        items={categories || []}
        onDragEnd={onCategoriesOrderChange}
        onDeleteItem={onDeleteCategoryModalOpen}
        onClickItem={onClickItem}
        initialCategoryId={categoryId}
        // @ts-ignore
        ListItem={ListItem}
      />

      <DeleteCategoryModal
        category={categoryToDelete}
        open={isDeleteCategoryModalOpen}
        onOk={onDeleteCategory}
        onCancel={onCloseDeleteCategory}
      />
    </div>
  );
};
