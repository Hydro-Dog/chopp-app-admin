import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNotificationContext } from '@shared/index';
import { updateCategoryTitle } from '@store/slices/product-category-slice';
import { AppDispatch } from '@store/store';
import { Button, Flex, Form, Input } from 'antd';
import { Tooltip } from 'antd/lib';
import { z } from 'zod';
import { useEditCategoryFormSchema } from './hooks';
import { LIST_ITEM_MODE } from '../../enum';

const { Item } = Form;

type Props = {
  setMode: Dispatch<SetStateAction<LIST_ITEM_MODE>>;
  editError?: boolean;
  value: string;
  id: string;
};

export const EditView = ({ setMode, value, id }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const editCategoryFormSchema = useEditCategoryFormSchema();
  const { showErrorNotification } = useNotificationContext();

  type EditCategoryFormType = z.infer<typeof editCategoryFormSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditCategoryFormType>({
    resolver: zodResolver(editCategoryFormSchema),
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    defaultValues: {
      title: value,
    },
  });

  const onSubmit: SubmitHandler<EditCategoryFormType> = ({ title }) => {
    dispatch(updateCategoryTitle({ id, title }))
      .unwrap()
      .then(() => setMode(LIST_ITEM_MODE.VIEW))
      .catch((error) => showErrorNotification({ message: t('ERROR'), description: error.message }));
  };

  return (
    <Form className="pt-3 w-full" labelAlign="left" labelWrap colon={false} onFinish={handleSubmit(onSubmit)}>
      <Flex align="start" justify="space-between">
        <Item<EditCategoryFormType> validateStatus={errors.title ? 'error' : ''} help={errors.title?.message || t('ADD_CATEGORY_DESCRIPTION')}>
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
                setMode(LIST_ITEM_MODE.VIEW);
              }}>
              <CloseRoundedIcon />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </Form>
  );
};
