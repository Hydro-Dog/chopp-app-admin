import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicModal } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import { fetchCategories, createCategory } from '@store/slices/goods-slice';
import { AppDispatch, RootState } from '@store/store';
import { FETCH_STATUS } from '@store/types';
import { Form, Input, InputRef } from 'antd';
import { z } from 'zod';
import { useCreateCategoryFormSchema } from '../../hooks';

const { Item } = Form;

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CreateCategoryModal = ({ open, ...props }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, createCategoryStatus, createCategoryError } = useSelector(
    (state: RootState) => state.goods,
  );
  const { showNotification } = useNotificationContext();
  const inputRef = useRef<InputRef>(null);

  const createCategoryFormSchema = useCreateCategoryFormSchema();
  type CreateCategoryFormType = z.infer<typeof createCategoryFormSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateCategoryFormType>({
    resolver: zodResolver(createCategoryFormSchema),
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    defaultValues: {
      category: '',
    },
  });

  const onSubmit: SubmitHandler<CreateCategoryFormType> = ({ category: title }) => {
    dispatch(
      createCategory({
        title,
        order: categories?.length !== undefined ? categories?.length : 0,
      }),
    )
      .unwrap()
      .then(onClose)
      .catch((error) => {
        showNotification({
          type: 'error',
          message: 'Error',
          description: error?.message,
        });
      });
  };

  const onClose = () => {
    reset();
    props.onClose();
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <BasicModal
      title={t('ADD_CATEGORY')}
      open={open}
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
                <Input {...field} ref={inputRef} placeholder={t('CATEGORY')} />
              </div>
            )}
          />
        </Item>
      </Form>
    </BasicModal>
  );
};
