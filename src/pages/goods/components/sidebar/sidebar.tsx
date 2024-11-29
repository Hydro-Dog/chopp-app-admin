import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { BasicModal, ChopDraggableList } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import {
  fetchCategories,
  createCategory,
  Category,
  updateCategories,
  deleteCategory,
} from '@store/slices/goods-slice';
import { AppDispatch, RootState } from '@store/store';
import { FETCH_STATUS } from '@store/types';
import { Spin, Flex, Tooltip, Button, Form, Input, Typography } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { z } from 'zod';
import { useCreateCategoryFormSchema } from './hooks';
import { CreateCategoryModal } from './components';
import { DeleteCategoryModal } from './components/delete-category-modal';

const { Item } = Form;
const { Title } = Typography;

export const Sidebar = () => {
  const { t } = useTranslation();
  // const themeToken = useThemeToken();
  const dispatch = useDispatch<AppDispatch>();
  const {
    categories,
    createCategoryStatus,
    createCategoryError,
    fetchCategoriesStatus,
    fetchCategoriesError,
    updateCategoriesStatus,
    updateCategoriesError,
  } = useSelector((state: RootState) => state.goods);
  const { openNotification } = useNotificationContext();

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

  const createCategoryFormSchema = useCreateCategoryFormSchema();
  type CreateCategoryFormType = z.infer<typeof createCategoryFormSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<{ category: string }>({
    resolver: zodResolver(createCategoryFormSchema),
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    defaultValues: {
      category: '',
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onSubmit: SubmitHandler<CreateCategoryFormType> = ({ category: title }) => {
    dispatch(
      createCategory({
        title,
        order: categories?.length !== undefined ? categories?.length : 0,
      }),
    );
    onClose();
  };

  const onClose = () => {
    reset();
    closeCreateCategoryModal();
  };

  const onCategoriesOrderChange = (newCategories: Category[]) => {
    dispatch(updateCategories(newCategories));
  };

  const onDeleteCategoryClick = (id: string) => {
    setCategoryToDelete(categories?.find((item) => item.id == id));
    openDeleteCategoryModal();
  };

  const onCloseDeleteCategory = () => {
    closeDeleteCategoryModal();
    setCategoryToDelete(undefined);
  };

  const onDeleteCategory = () => {
    dispatch(deleteCategory(categoryToDelete!.id));
    onCloseDeleteCategory();
  };

  const flexRef = useRef(null);

  //TODO: сделать хук, который будет принимать список статусов и реагировать на их изменение в ошибку useHook([createCategoryStatus,fetchCategoriesStatus,... ])
  //   useEffect(() => {
  //     if (createCategoryStatus === FETCH_STATUS.ERROR) {
  //       openNotification({
  //         type: 'error',
  //         message: 'Error',
  //         description: createCategoryError?.errorMessage,
  //       });
  //     } else if (fetchCategoriesStatus === FETCH_STATUS.ERROR) {
  //       openNotification({
  //         type: 'error',
  //         message: 'Error',
  //         description: fetchCategoriesError?.errorMessage,
  //       });
  //     } else if (updateCategoriesStatus === FETCH_STATUS.ERROR) {
  //       openNotification({
  //         type: 'error',
  //         message: 'Error',
  //         description: updateCategoriesError?.errorMessage,
  //       });
  //     }
  //   }, [openNotification, createCategoryStatus, fetchCategoriesStatus, updateCategoriesStatus]);

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
              items={categories || []}
              onDragEnd={onCategoriesOrderChange}
              onDeleteItem={onDeleteCategoryClick}
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
