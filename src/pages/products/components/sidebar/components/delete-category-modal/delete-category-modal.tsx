import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, CustomModal } from '@shared/index';
import { Alert, Flex, Typography, Input, Form } from 'antd';
import { z } from 'zod';
import { useDeleteCategoryFormSchema } from './hooks';
import { useAutoFocus } from '../../../../../../shared/hooks/use-auto-focus';

const { Text } = Typography;
const { Item } = Form;

type Props = {
  category?: Category;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
};

export const DeleteCategoryModal = ({ category, open, onCancel, onOk }: Props) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const editCategoryFormSchema = useDeleteCategoryFormSchema({ categoryTitle: category?.title });
  type EditCategoryForm = z.infer<typeof editCategoryFormSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<EditCategoryForm>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: { name: '' },
    mode: 'onChange',
  });

  const watchedCategoryName = watch('name');

  const handleClose = () => {
    reset();
    onCancel();
  };

  useAutoFocus({ open, inputRef });

  return (
    <CustomModal
      title={t('DELETE_CATEGORY')}
      open={open}
      onOk={handleSubmit(onOk)}
      onCancel={handleClose}
      okTitle={t('DELETE')}
      okColor="danger"
      okDisabled={watchedCategoryName !== category?.title && !isValid}>
      <Flex vertical gap={8}>
        <Alert
          message={
            <>
              <Text>{t('ALL_PRODUCTS_WILL_BE_MOVED_TO')} </Text>
              <Text strong>{t('NO_CATEGORY')}</Text>
            </>
          }
          type="error"
        />

        <Flex gap={4}>
          <Text>{t('YOU_ARE_GOING_TO_REMOVE_CATEGORY')}</Text>
          <Text strong>{category?.title}</Text>
        </Flex>

        <Form layout="vertical" onFinish={handleSubmit(onOk)}>
          <Item
            label={t('INPUT_CATEGORY_TO_DELETE_NAME')}
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}>
            <Controller
              name="name"
              control={control}
              // @ts-ignore
              render={({ field }) => <Input {...field} ref={inputRef} placeholder={t('CATEGORY')} />}
            />
          </Item>
        </Form>
      </Flex>
    </CustomModal>
  );
};
