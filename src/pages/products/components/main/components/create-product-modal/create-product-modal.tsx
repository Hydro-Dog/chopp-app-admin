import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConfirmModal } from '@shared/components';
import { useNotificationContext } from '@shared/index';
import {
  Alert,
  Flex,
  Form,
  GetProp,
  Input,
  InputNumber,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { z } from 'zod';
import { useCreateProductFormSchema } from './hooks';

const { Item } = Form;
const { Text } = Typography;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Обработчик загрузки файла, который просто сохраняет файлы в состояние
const useGetBeforeUpload = () => {
  const { t } = useTranslation();
  const { showErrorNotification } = useNotificationContext();

  return (file) => {
    const isFormatValid = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isFormatValid) {
      showErrorNotification({
        message: t('ERROR'),
        description: t('UPLOAD_IMAGE_ERROR.INVALID_FORMAT'),
      });
      return 'ass';
    }
    const mbLimitOverload = file.size / 1024 / 1024 > 2;
    if (mbLimitOverload) {
      showErrorNotification({
        message: t('ERROR'),
        description: t('UPLOAD_IMAGE_ERROR.TOO_BIG', { mb: 2 }),
      });
      return 'boob';
    }

    return isFormatValid && !mbLimitOverload ? false : Upload.LIST_IGNORE; // Возвращаем false, чтобы предотвратить автоматическую загрузку
  };
};

type Props = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
};

export const CreateProductModal = ({ open, onCancel, onOk }: Props) => {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const beforeUpload = useGetBeforeUpload();

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
    try {
      const formData = new FormData();
      console.log('fileList: ', fileList);
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('files', file.originFileObj);
        }
      });
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price?.toString() || '');

      console.log('formData: ', formData);
    } catch (error) {
      console.log('ERrrrrrrrOR: ', error);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <ConfirmModal
      title={t('CREATE_PRODUCT')}
      open={open}
      onOk={handleSubmit(onSubmit)}
      onCancel={onCancel}
      okTitle={t('ADD')}>
      <Form layout="vertical" className="flex flex-col gap-4">
        <Item
          className="!m-0"
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
          className="!m-0"
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
          className="!m-0"
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

        <Item validateStatus="error" help={t('IMAGE_REQUIRED')}>
          <Flex vertical gap={8}>
            <Upload
              locale={{
                uploading: t('UPLOAD.UPLOADING'),
                removeFile: t('UPLOAD.REMOVE_FILE'),
                uploadError: t('UPLOAD.UPLOAD_ERROR'),
                previewFile: t('UPLOAD.PREVIEW_FILE'),
              }}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}>
              {fileList.length >= 8 ? null : (
                <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>{t('UPLOAD')}</div>
                </button>
              )}
            </Upload>
            <Alert message={<Text>{t('UPLOAD_IMAGE_HELPER_TEXT')}</Text>} type="info" />
          </Flex>
        </Item>
      </Form>
    </ConfirmModal>
  );
};
