import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { TitlePage, useNotificationContext, ChopDraggableList, BasicModal } from '@shared/index';
import { AppDispatch, FETCH_STATUS, RootState } from '@store/index';
import {
  Category,
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategories,
} from '@store/slices/goods-slice';
import { Button, Card, Flex, Form, Input, Spin, Tooltip, Typography } from 'antd';
import { Splitter } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { z } from 'zod';
import { useCreateCategoryFormSchema } from './components/sidebar/hooks';
import { Sidebar } from './components';

const { Item } = Form;
const { Title } = Typography;

export const GoodsPage = () => {
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

  // const onCreateCategory = () => {
  //   closeCreateCategoryModal();
  // };

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
  // useEffect(() => {
  //   if (createCategoryStatus === FETCH_STATUS.ERROR) {
  //     openNotification({
  //       type: 'error',
  //       message: 'Error',
  //       description: createCategoryError?.errorMessage,
  //     });
  //   } else if (fetchCategoriesStatus === FETCH_STATUS.ERROR) {
  //     openNotification({
  //       type: 'error',
  //       message: 'Error',
  //       description: fetchCategoriesError?.errorMessage,
  //     });
  //   } else if (updateCategoriesStatus === FETCH_STATUS.ERROR) {
  //     openNotification({
  //       type: 'error',
  //       message: 'Error',
  //       description: updateCategoriesError?.errorMessage,
  //     });
  //   }
  // }, [openNotification, createCategoryStatus, fetchCategoriesStatus, updateCategoriesStatus]);

  return (
    <>
      <TitlePage title={t('GOODS')}>
        <Card className="h-full" size="small">
          <Splitter
            style={{
              position: 'absolute',
              // 48px - это два паддинга стандартного card-body
              height: `calc(100% - 24px)`,
              width: `calc(100% - 48px)`,
            }}>
            <Splitter.Panel defaultSize="20%" min="20%" max="40%">
              <Sidebar />
            </Splitter.Panel>
            <Splitter.Panel>
              <>
                <Flex align="center" justify="space-between">
                  <Flex ref={flexRef} align="center" gap={20} className="ml-4">
                    <StorefrontOutlinedIcon />
                    <Title className="!m-0" level={4}>
                      {t('GOODS')}
                    </Title>
                  </Flex>
                  <Tooltip title={t('ADD_GOODS')}>
                    <Button
                      disabled={updateCategoriesStatus === FETCH_STATUS.LOADING}
                      loading={updateCategoriesStatus === FETCH_STATUS.LOADING}
                      onClick={openCreateCategoryModal}
                      type="primary">
                      <AddRoundedIcon />
                    </Button>
                  </Tooltip>
                </Flex>
                content
              </>
            </Splitter.Panel>
          </Splitter>
        </Card>
      </TitlePage>
    </>
  );
};
