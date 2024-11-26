import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { BasicModal } from '@shared/components/basic-modal/basic-modal';
import DragDropList from '@shared/components/chopp-draggable-list/chopp-draggable-list';
import { TitlePage, useNotificationContext } from '@shared/index';
import { AppDispatch, FETCH_STATUS, RootState } from '@store/index';
import {
  Category,
  createCategory,
  fetchCategories,
  updateCategories,
} from '@store/slices/goods-slice';
import { Button, Card, Form, Input, List, Skeleton } from 'antd';
import { useBoolean, useWindowSize } from 'usehooks-ts';
import { z } from 'zod';

const { Item } = Form;

const useCreateCategoryFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    category: z.string().min(1, { message: t('ERRORS.REQUIRED') }),
  });
};

export const GoodsPage = () => {
  const { t } = useTranslation();
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
  const { height = 0 } = useWindowSize();
  const { openNotification } = useNotificationContext();

  const {
    value: isCreateCategoryModalOpen,
    setTrue: openCreateCategoryModal,
    setFalse: closeCreateCategoryModal,
  } = useBoolean();

  const onCreateCategory = () => {
    closeCreateCategoryModal();
  };

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

  //TODO: сделать хук, который будет принимать список статусов и реагировать на их изменение в ошибку useHook([createCategoryStatus,fetchCategoriesStatus,... ])
  useEffect(() => {
    if (createCategoryStatus === FETCH_STATUS.ERROR) {
      openNotification({
        type: 'error',
        message: 'Error',
        description: createCategoryError?.errorMessage,
      });
    } else if (fetchCategoriesStatus === FETCH_STATUS.ERROR) {
      openNotification({
        type: 'error',
        message: 'Error',
        description: fetchCategoriesError?.errorMessage,
      });
    } else if (updateCategoriesStatus === FETCH_STATUS.ERROR) {
      openNotification({
        type: 'error',
        message: 'Error',
        description: updateCategoriesError?.errorMessage,
      });
    } 
  }, [openNotification, createCategoryStatus, fetchCategoriesStatus, updateCategoriesStatus]);

  return (
    <>
      <TitlePage title={t('GOODS')}>
        <Card
          title={t('CATEGORIES')}
          extra={
            <Button
              disabled={updateCategoriesStatus === FETCH_STATUS.LOADING}
              loading={updateCategoriesStatus === FETCH_STATUS.LOADING}
              onClick={openCreateCategoryModal}
              type="primary"
              icon={<AddRoundedIcon />}>
              {t('ADD_CATEGORY')}
            </Button>
          }>
          {fetchCategoriesStatus === FETCH_STATUS.LOADING ? (
            <Skeleton />
          ) : (
            <DragDropList items={categories || []} onDragEnd={onCategoriesOrderChange} />
          )}
        </Card>
      </TitlePage>
      <BasicModal
        title={t('ADD_CATEGORY')}
        open={isCreateCategoryModalOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={onClose}>
        <Form labelAlign="left" labelWrap colon={false} onFinish={handleSubmit(onSubmit)}>
          <Item<CreateCategoryFormType>
            validateStatus={errors.category ? 'error' : ''}
            help={errors.category?.message || t('ADD_CATEGORY_DESCRIPTION')}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <div className="flex">
                  <Input {...field} placeholder={t('CATEGORY')} />
                </div>
              )}
            />
          </Item>
        </Form>
      </BasicModal>
    </>
  );
};
