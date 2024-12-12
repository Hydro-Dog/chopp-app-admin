import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicModal } from '@shared/index';
import { useSuperDispatch } from '@shared/index';
import { createCategory } from '@store/slices/product-category-slice';
import { RootState } from '@store/store';
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
  const superDispatch = useSuperDispatch();
  const { categories, createCategoryStatus } = useSelector(
    (state: RootState) => state.productCategory,
  );
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

  console.log('createCategoryStatus: ', createCategoryStatus);

  const onSubmit: SubmitHandler<CreateCategoryFormType> = ({ category: title }) => {
    superDispatch({
      action: createCategory({
        title,
        order: categories?.length !== undefined ? categories?.length : 0,
      }),
      thenHandler: onClose,
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
      onCancel={onClose}
      confirmLoading={createCategoryStatus === FETCH_STATUS.LOADING}>
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
