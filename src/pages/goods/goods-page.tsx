import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import {
  TitlePage,
  useNotificationContext,
  DragDropList,
  BasicModal,
  useThemeToken,
  ChoppClickableIcon,
} from '@shared/index';
import { AppDispatch, FETCH_STATUS, RootState } from '@store/index';
import {
  Category,
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategories,
} from '@store/slices/goods-slice';
import { Button, Card, Flex, Form, Input, Skeleton, Spin, theme, Tooltip, Typography } from 'antd';
import { Splitter } from 'antd';
import { useBoolean, useWindowSize } from 'usehooks-ts';
import { z } from 'zod';

const { Item } = Form;
const { Title } = Typography;

const useCreateCategoryFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    category: z.string().min(1, { message: t('ERRORS.REQUIRED') }),
  });
};

export const GoodsPage = () => {
  const { t } = useTranslation();
  const themeToken = useThemeToken();
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
    console.log('onCategoriesOrderChange: ', newCategories);
    dispatch(updateCategories(newCategories));
  };

  const onDeleteCategory = (id: string) => {
    console.log('onDeleteCategory: ', id);
    dispatch(deleteCategory(id));
  };

  const flexRef = useRef(null);

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

  console.log('flexRef.current?.offsetHeight: ', flexRef.current?.offsetHeight)

  return (
    <>
      <TitlePage title={t('GOODS')}>
        <Card
          style={{
            height: `calc(100%)`,
            overflow: 'scroll',
          }}
          styles={{ body: { padding: 0 } }}>
          <Flex ref={flexRef} className='p-2' justify='space-between'>
            <Title level={5}>{t('CATEGORIES')}</Title>
            <Button
              disabled={updateCategoriesStatus === FETCH_STATUS.LOADING}
              loading={updateCategoriesStatus === FETCH_STATUS.LOADING}
              onClick={openCreateCategoryModal}
              type="primary"
              icon={<AddRoundedIcon />}>
              {t('ADD_CATEGORY')}
            </Button>
          </Flex>
          <Splitter>
            <Splitter.Panel defaultSize="20%" min="10%" max="30%">
              {fetchCategoriesStatus === FETCH_STATUS.LOADING ? (
                <Spin size="large" />
              ) : (
                <DragDropList
                  items={categories || []}
                  onDragEnd={onCategoriesOrderChange}
                  onDeleteItem={onDeleteCategory}
                />
              )}
            </Splitter.Panel>
            <Splitter.Panel>content</Splitter.Panel>
          </Splitter>
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
