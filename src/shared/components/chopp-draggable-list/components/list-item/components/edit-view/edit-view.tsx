import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button, Flex, Form, Input } from 'antd';
import { Tooltip } from 'antd/lib';
import { z } from 'zod';
import { useEditCategoryFormSchema } from './hooks';

const { Item } = Form;

type Props = {
  onChange: (val: string) => void;
  setMode: Dispatch<SetStateAction<'edit' | 'read'>>;
  editError?: boolean;
  value: string;
};

export const EditView = ({ onChange, setMode, editError, value }: Props) => {
  const { t } = useTranslation();
  const editCategoryFormSchema = useEditCategoryFormSchema();

  type EditCategoryFormType = z.infer<typeof editCategoryFormSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<EditCategoryFormType>({
    resolver: zodResolver(editCategoryFormSchema),
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    defaultValues: {
      title: value,
    },
  });

  const onSubmit: SubmitHandler<EditCategoryFormType> = ({ title }) => {
    onChange(title);
    // Дождаться, пока придет актуальный статус updateCategoryTitle
    setTimeout(() => {
      if (!editError) {
        setMode('read');
      }
    }, 100);
  };

  return (
    <Form
      className="pt-3 w-full"
      labelAlign="left"
      labelWrap
      colon={false}
      onFinish={handleSubmit(onSubmit)}>
      <Flex align="start" justify="space-between">
        <Item<EditCategoryFormType>
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title?.message || t('ADD_CATEGORY_DESCRIPTION')}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <div className="flex">
                <Input {...field} autoFocus placeholder={t('CATEGORY')} />
              </div>
            )}
          />
        </Item>
        <Flex align="center" gap={8}>
          <Tooltip title={t('CONFIRM')}>
            <Button
              shape="circle"
              color="primary"
              variant="filled"
              htmlType="submit"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <CheckRoundedIcon />
            </Button>
          </Tooltip>

          <Tooltip title={t('CANCEL')}>
            <Button
              shape="circle"
              variant="filled"
              type="text"
              onClick={(e) => {
                e.stopPropagation();
                setMode('read');
              }}>
              <CloseRoundedIcon />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </Form>
  );
};
