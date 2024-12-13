import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicModal } from '@shared/index';
import { useNotificationContext } from '@shared/index';
import { createCategory } from '@store/slices/product-category-slice';
import { AppDispatch, RootState } from '@store/store';
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
    (state: RootState) => state.productCategory,
  );
  const { showErrorNotification } = useNotificationContext();
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
        showErrorNotification({
          message: t('Error'),
          description: error?.message,
        });
      });
  };

  const onClose = () => {
    reset();
    props.onClose();
  };

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
      <Form onFinish={handleSubmit(onSubmit)}>
        <Item validateStatus={errors.category && 'error'} help={errors.category?.message}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => <Input {...field} ref={inputRef} placeholder={t('CATEGORY')} />}
          />
        </Item>
      </Form>
    </BasicModal>
  );
};
