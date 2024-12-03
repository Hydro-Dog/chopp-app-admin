import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConfirmModal } from '@shared/components';
import { useThemeToken } from '@shared/index';
import CurrencyRubleRoundedIcon from '@mui/icons-material/CurrencyRubleRounded';
import { Alert, Button, Flex, Form, Input, InputNumber, Tooltip, Typography } from 'antd';
import { z } from 'zod';
import { useCreateProductFormSchema } from './hooks';

const { Item } = Form;
const { Text } = Typography;

type Props = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
};

export const CreateProductModal = ({ open, onCancel, onOk }: Props) => {
  const { t } = useTranslation();
  const themeToken = useThemeToken();
  const createProductFormSchema = useCreateProductFormSchema();
  type CreateProductFormType = z.infer<typeof createProductFormSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ title: string; description: string; price: number | null }>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 100,
    },
  });

  const onSubmit: SubmitHandler<CreateProductFormType> = (data) => {
    console.log('data: ', data);
  };

  return (
    <ConfirmModal
      title={t('CREATE_PRODUCT')}
      open={open}
      onOk={handleSubmit(onSubmit)}
      onCancel={onCancel}
      okTitle={t('ADD')}>
      {/* <Flex style={{ background: themeToken.colorBgBase }}> */}
      <Form layout="vertical">
        <Item
          className="!mb-2"
          label={t('TITLE_NAME')}
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title?.message}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} placeholder={t('TITLE_NAME')} />}
          />
        </Item>

        <Item
          className="!mb-2"
          label={t('DESCRIPTION')}
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={4} placeholder={t('DESCRIPTION')} />
            )}
          />
        </Item>

        <Item
          label={t('PRICE')}
          validateStatus={errors.price ? 'error' : ''}
          help={errors.price?.message}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                prefix="₽"
                value={field.value || ''}
                onChange={(val) => field.onChange(val || 0)}
                className="w-1/2"
              />
            )}
          />
        </Item>
      </Form>
    </ConfirmModal>
  );
};
