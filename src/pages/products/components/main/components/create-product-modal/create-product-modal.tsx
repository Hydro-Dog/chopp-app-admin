import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConfirmModal } from '@shared/components';
import { useNotificationContext, useSearchParam } from '@shared/index';
import { AppDispatch, createProduct } from '@store/index';
import {
  Alert,
  Form,
  GetProp,
  Input,
  InputNumber,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from 'antd';
import { t } from 'i18next';
import { z } from 'zod';
import { useCreateProductFormSchema } from './hooks';
import { createFormDto } from './utils';

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
const useBeforeUpload = () => {
  const { showErrorNotification } = useNotificationContext();
  const { t } = useTranslation();

  return (file) => {
    console.log('file.type: ', file.type);
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      console.error('Вы можете загрузить только JPG/PNG файл!');
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.IMAGE_INVALID_FORMAT', { format: 'JPG, JPEG, PNG' }),
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error('Изображение должно быть меньше 2MB!');
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.IMAGE_TOO_BIG', { mb: 2 }),
      });
    }

    return isJpgOrPng && isLt2M ? false : Upload.LIST_IGNORE; // Возвращаем false, чтобы предотвратить автоматическую загрузку
  };
};

type Props = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
};

export const CreateProductModal = ({ open, onCancel, onOk }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const categoryId = useSearchParam('id');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadImageError, setUploadImageError] = useState('');
  const { showErrorNotification, showSuccessNotification } = useNotificationContext();
  const beforeUpload = useBeforeUpload();

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

  const onSubmit: SubmitHandler<CreateProductFormType> = async (data) => {
    if (!fileList.length) {
      setUploadImageError(t('ERRORS.UPLOAD_IMAGE'));
      return;
    } else {
      const reqData = createFormDto({ ...data, fileList, category: categoryId || '' });
      dispatch(createProduct(reqData))
        .unwrap()
        .then(() => {
          showSuccessNotification({
            message: t('SUCCESS'),
            description: t('PRODUCT_CREATED_SUCCESSFULLY_MESSAGE'),
          });
        })
        .catch((err) =>
          showErrorNotification({
            message: t('ERROR'),
            description: err.message,
          }),
        );
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    if (!fileList || !fileList?.length) {
      setUploadImageError(t('ERRORS.UPLOAD_IMAGE'));
    } else {
      setUploadImageError('');
    }
    setFileList(fileList);
  };

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
          validateStatus={errors.title && 'error'}
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
          validateStatus={errors.description && 'error'}
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
          validateStatus={errors.price && 'error'}
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

        <Item
          className="!m-0"
          label={t('IMAGES')}
          validateStatus={uploadImageError && 'error'}
          help={uploadImageError}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}>
            {fileList.length >= 8 ? null : (
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
        </Item>
        <Alert
          message={
            <Text>{t('UPLOAD_IMAGE_HELPER_TEXT', { format: 'JPG, JPEG, PNG', mb: 2 })}</Text>
          }
          type="info"
        />
      </Form>
    </ConfirmModal>
  );
};
